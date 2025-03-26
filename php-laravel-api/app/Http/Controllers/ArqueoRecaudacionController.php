<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ArqueorecaudacionCab;
use App\Models\ArqueorecaudacionDet;
use App\Models\TblServicios;
use App\Models\TblPuntosRecaudacion;
use App\Models\Arqueocab;
use App\Models\Arqueodetcortes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class ArqueoRecaudacionController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = ArqueorecaudacionCab::with([
                'puntoRecaudacion',
                'detalles' => function($q) {
                    $q->with('servicio');
                }
            ]);
            
            if($request->search) {
                $search = trim($request->search);
                $query->where(function($query) use ($search) {
                    $query->where('arqueocorrelativo', 'like', "%$search%")
                          ->orWhere('arqueonombreoperador', 'like', "%$search%")
                          ->orWhere('arqueonombresupervisor', 'like', "%$search%");
                });
            }
            
            if($request->fecha_desde && $request->fecha_hasta) {
                $query->whereBetween('arqueofecha', [$request->fecha_desde, $request->fecha_hasta]);
            } else if($request->fecha) {
                $query->whereDate('arqueofecha', $request->fecha);
            }
            
            if($request->turno) {
                $query->where('arqueoturno', $request->turno);
            }

            $records = $query->orderBy('arqueofecha', 'desc')
                           ->orderBy('arqueocorrelativo', 'desc')
                           ->get();
            
            return response()->json($records);
            
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'arqueocorrelativo' => 'required',
                'arqueofecha' => 'required|date',
                'arqueonombreoperador' => 'required',
                'punto_recaud_id' => 'required',
                'arqueoturno' => 'required|in:M,T,N',
                'detalles' => 'required|array'
            ]);

            $cabecera = ArqueorecaudacionCab::create([
                'arqueocorrelativo' => $request->arqueocorrelativo,
                'arqueofecha' => $request->arqueofecha,
                'arqueoturno' => $request->arqueoturno,
                'punto_recaud_id' => $request->punto_recaud_id,
                'arqueonombreoperador' => $request->arqueonombreoperador,
                'arqueousuario' => 1,
                'arqueofecharegistro' => now(),
                'arqueoestado' => 'P',
                'arqueonombresupervisor' => $request->arqueonombresupervisor ?? null
            ]);

            foreach ($request->detalles as $detalle) {
                $cantidad = intval($detalle['arqueodetcantidad'] ?? 0);
                $tarifa = floatval($detalle['arqueodettarifabs'] ?? 0);
                $importeEnviado = floatval($detalle['arqueodetimportebs'] ?? 0);

                ArqueorecaudacionDet::create([
                    'arqueorecid' => $cabecera->arqueorecid,
                    'servicio_id' => $detalle['servicio_id'],
                    'arqueodetcantidad' => $cantidad,
                    'arqueodettarifabs' => $tarifa,
                    'arqueodetimportebs' => $importeEnviado,
                    'arqueoestado' => 'P'
                ]);
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Arqueo creado correctamente',
                'data' => $cabecera->load('detalles.servicio', 'puntoRecaudacion')
            ]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error al crear arqueo: ' . $e->getMessage()
            ], 500);
        }
    }

    // Método para generar el arqueo final consolidado
    public function generarArqueoFinal(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'arqueonumero' => 'required',
                'arqueofecha' => 'required|date',
                'arqueoturno' => 'required|in:M,T,N',
                'arqueohorainicio' => 'required',
                'arqueohorafin' => 'required',
                'arqueosupervisor' => 'required',
                'cortes' => 'required|array'
            ]);

            // Crear arqueo principal
            $arqueoCab = Arqueocab::create([
                'arqueonumero' => $request->arqueonumero,
                'arqueofecha' => $request->arqueofecha,
                'arqueoturno' => $request->arqueoturno,
                'arqueohorainicio' => $request->arqueohorainicio,
                'arqueohorafin' => $request->arqueohorafin,
                'arqueosupervisor' => 1, // Por defecto 1
                'arqueorealizadopor' => 1, // Por defecto 1
                'arqueorevisadopor' => 1, // Por defecto 1
                'arqueorecaudaciontotal' => 0, // Se actualizará después
                'arqueodiferencia' => 0, // Se calculará después
                'arqueoobservacion' => $request->arqueoobservacion,
                'arqueoestado' => 'A',
                'arqueofecharegistro' => now(),
                'arqueousuario' => 1 // Por defecto 1
            ]);

            // Registrar cortes
            Arqueodetcortes::create([
                'arqueoid' => $arqueoCab->arqueoid,
                // ...resto de campos de cortes...
            ]);

            // Actualizar recaudaciones relacionadas y calcular totales
            $recaudaciones = ArqueorecaudacionCab::where('arqueofecha', $request->arqueofecha)
                ->where('arqueoturno', $request->arqueoturno)
                ->get();

            foreach($recaudaciones as $recaudacion) {
                $recaudacion->arqueoid = $arqueoCab->arqueoid;
                $recaudacion->arqueoestado = 'A';
                $recaudacion->save();
            }

            // Obtener todos los arqueos de recaudación de la fecha indicada
            $recaudaciones = ArqueorecaudacionCab::where('arqueofecha', $request->arqueofecha)
                ->where('arqueoturno', $request->arqueoturno)
                ->with('detalles.servicio')
                ->get();
                
            if($recaudaciones->isEmpty()) {
                throw new Exception('No hay recaudaciones para la fecha y turno indicados');
            }
            
            // Calcular el total recaudado según los registros de los operadores
            $totalRecaudado = 0;
            foreach($recaudaciones as $recaudacion) {
                foreach($recaudacion->detalles as $detalle) {
                    $totalRecaudado += $detalle->arqueodetimportebs;
                }
            }
            
            // Calcular el total según los cortes
            $totalCortes = 0;
            $cortes = $request->cortes;
            if($cortes['arqueocorte200_00']) $totalCortes += 200 * $cortes['arqueocorte200_00'];
            if($cortes['arqueocorte100_00']) $totalCortes += 100 * $cortes['arqueocorte100_00'];
            if($cortes['arqueocorte050_00']) $totalCortes += 50 * $cortes['arqueocorte050_00'];
            if($cortes['arqueocorte020_00']) $totalCortes += 20 * $cortes['arqueocorte020_00'];
            if($cortes['arqueocorte010_00']) $totalCortes += 10 * $cortes['arqueocorte010_00'];
            if($cortes['arqueocorte005_00']) $totalCortes += 5 * $cortes['arqueocorte005_00'];
            if($cortes['arqueocorte002_00']) $totalCortes += 2 * $cortes['arqueocorte002_00'];
            if($cortes['arqueocorte001_00']) $totalCortes += 1 * $cortes['arqueocorte001_00'];
            if($cortes['arqueocorte000_50']) $totalCortes += 0.5 * $cortes['arqueocorte000_50'];
            if($cortes['arqueocorte000_20']) $totalCortes += 0.2 * $cortes['arqueocorte000_20'];
            if($cortes['arqueocorte000_10']) $totalCortes += 0.1 * $cortes['arqueocorte000_10'];
            
            // Calcular diferencia
            $diferencia = $totalCortes - $totalRecaudado;
            
            // Crear cabecera de arqueo
            $arqueoCab = Arqueocab::create([
                'arqueonumero' => $request->arqueonumero,
                'arqueofecha' => $request->arqueofecha,
                'arqueoturno' => $request->arqueoturno,
                'arqueohorainicio' => $request->arqueohorainicio,
                'arqueohorafin' => $request->arqueohorafin,
                'arqueosupervisor' => $request->arqueosupervisor,
                'arqueorealizadopor' => auth()->id(),
                'arqueorevisadopor' => null,
                'arqueorecaudaciontotal' => $totalRecaudado,
                'arqueodiferencia' => $diferencia,
                'arqueoobservacion' => $request->arqueoobservacion,
                'arqueoestado' => 'A',
                'arqueofecharegistro' => now(),
                'arqueousuario' => auth()->id()
            ]);
            
            // Crear detalle de cortes
            $arqueoidGenerado = $arqueoCab->arqueoid;
            
            Arqueodetcortes::create([
                'arqueoid' => $arqueoidGenerado,
                'arqueocorte200_00' => $cortes['arqueocorte200_00'] ?? 0,
                'arqueocorte100_00' => $cortes['arqueocorte100_00'] ?? 0,
                'arqueocorte050_00' => $cortes['arqueocorte050_00'] ?? 0,
                'arqueocorte020_00' => $cortes['arqueocorte020_00'] ?? 0,
                'arqueocorte010_00' => $cortes['arqueocorte010_00'] ?? 0,
                'arqueocorte005_00' => $cortes['arqueocorte005_00'] ?? 0,
                'arqueocorte002_00' => $cortes['arqueocorte002_00'] ?? 0,
                'arqueocorte001_00' => $cortes['arqueocorte001_00'] ?? 0,
                'arqueocorte000_50' => $cortes['arqueocorte000_50'] ?? 0,
                'arqueocorte000_20' => $cortes['arqueocorte000_20'] ?? 0,
                'arqueocorte000_10' => $cortes['arqueocorte000_10'] ?? 0,
                'arqueoestado' => 'A'
            ]);
            
            // Actualizar las recaudaciones relacionadas con el arqueoid generado
            foreach($recaudaciones as $recaudacion) {
                $recaudacion->arqueoid = $arqueoidGenerado;
                $recaudacion->arqueoestado = 'A'; // Arqueo realizado
                $recaudacion->save();
            }
            
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Arqueo final generado correctamente',
                'data' => [
                    'arqueoid' => $arqueoidGenerado,
                    'total_recaudado' => $totalRecaudado,
                    'total_cortes' => $totalCortes,
                    'diferencia' => $diferencia
                ]
            ]);
            
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error al generar arqueo final: ' . $e->getMessage()
            ], 500);
        }
    }

    // Método para obtener resumen de recaudación por servicios
    public function obtenerResumenPorServicios(Request $request)
    {
        try {
            $fecha = $request->fecha;
            $turno = $request->turno;
            
            if(!$fecha || !$turno) {
                return response()->json([
                    'success' => false,
                    'message' => 'Debe especificar fecha y turno'
                ], 400);
            }
            
            // Obtener recaudaciones por servicio
            $resumen = DB::table('arqueorecaudaciondet as det')
                ->join('arqueorecaudacioncab as cab', 'det.arqueorecid', '=', 'cab.arqueorecid')
                ->join('tbl_servicios as srv', 'det.servicio_id', '=', 'srv.servicio_id')
                ->where('cab.arqueofecha', $fecha)
                ->where('cab.arqueoturno', $turno)
                ->select(
                    'srv.servicio_id',
                    'srv.servicio_abreviatura as codigo',
                    'srv.servicio_descripcion as nombre',
                    DB::raw('SUM(det.arqueodetcantidad) as cantidad_total'),
                    DB::raw('SUM(det.arqueodetimportebs) as importe_total')
                )
                ->groupBy('srv.servicio_id', 'srv.servicio_abreviatura', 'srv.servicio_descripcion')
                ->orderBy('srv.servicio_descripcion')
                ->get();
                
            // Obtener operadores con sus puntos y servicios
            $operadores = DB::table('arqueorecaudacioncab as cab')
                ->join('arqueorecaudaciondet as det', 'cab.arqueorecid', '=', 'det.arqueorecid')
                ->join('tbl_puntos_recaudacion as pr', 'cab.punto_recaud_id', '=', 'pr.punto_recaud_id')
                ->join('tbl_servicios as srv', 'det.servicio_id', '=', 'srv.servicio_id')
                ->where('cab.arqueofecha', $fecha)
                ->where('cab.arqueoturno', $turno)
                ->select(
                    'cab.arqueonombreoperador as operador',
                    'pr.puntorecaud_nombre as punto',
                    'srv.servicio_abreviatura as codigo',
                    'det.arqueodetcantidad as cantidad',
                    'det.arqueodetimportebs as importe'
                )
                ->orderBy('cab.arqueonombreoperador')
                ->orderBy('pr.puntorecaud_nombre')
                ->get();
                
            return response()->json([
                'success' => true,
                'resumen_servicios' => $resumen,
                'detalle_operadores' => $operadores,
                'fecha' => $fecha,
                'turno' => $turno
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener resumen: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getPuntosRecaudacion()
    {
        try {
            $puntos = TblPuntosRecaudacion::where('puntorecaud_estado', 'A')
                ->orWhere('puntorecaud_estado', 'V') 
                ->select(
                    'punto_recaud_id as value',
                    'puntorecaud_nombre as label'
                )
                ->orderBy('puntorecaud_nombre')
                ->get();
                
            return response()->json($puntos);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function getServicios()
    {
        try {
            $servicios = TblServicios::where(function($query) {
                    $query->where('servicio_estado', 'A')
                          ->orWhereNull('servicio_estado');
                })
                ->select(
                    'servicio_id as value',
                    'servicio_descripcion as label',
                    'servicio_precio_base as precio',
                    'servicio_abreviatura as codigo'
                )
                ->orderBy('servicio_descripcion')
                ->get()
                ->map(function($servicio) {
                    $servicio->precio = (float)$servicio->precio;
                    return $servicio;
                });
            
            if ($servicios->count() > 0) {
                \Log::info('Primer servicio:', $servicios->first()->toArray());
            }

            return response()->json($servicios);
        } catch (Exception $e) {
            \Log::error('Error en getServicios: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener servicios: ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function getNextCorrelativo()
    {
        $maxCorrelativo = ArqueorecaudacionCab::max('arqueocorrelativo') ?? 0;
        return response()->json(['correlativo' => $maxCorrelativo + 1]);
    }

    public function getNextNumeroArqueo()
    {
        $maxNumero = Arqueocab::max('arqueonumero') ?? 0;
        return response()->json(['numero' => $maxNumero + 1]);
    }

    public function view($id)
    {
        try {
            $arqueo = ArqueorecaudacionCab::with([
                'detalles.servicio',
                'puntoRecaudacion'
            ])->findOrFail($id);
            
            return response()->json($arqueo);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $arqueo = ArqueorecaudacionCab::findOrFail($id);
            
            if($arqueo->arqueoestado !== 'P') {
                throw new Exception('No se puede modificar un arqueo que no está pendiente');
            }

            $arqueo->update([
                'arqueofecha' => $request->arqueofecha,
                'arqueonombreoperador' => $request->arqueonombreoperador
            ]);

            ArqueorecaudacionDet::where('arqueorecid', $id)->delete();
            
            foreach($request->detalles as $detalle) {
                $servicio = TblServicios::find($detalle['servicio_id']);
                $importe = $detalle['cantidad'] * $servicio->servicio_precio_base;
                
                ArqueorecaudacionDet::create([
                    'arqueorecid' => $id,
                    'punto_recaud_id' => $detalle['punto_recaud_id'],
                    'servicio_id' => $detalle['servicio_id'], 
                    'arqueodetcantidad' => $detalle['cantidad'],
                    'arqueodettarifabs' => $servicio->servicio_precio_base,
                    'arqueodetimportebs' => $importe,
                    'arqueoestado' => 'P'
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => 'Arqueo actualizado correctamente',
                'data' => $arqueo->load('detalles.servicio', 'puntoRecaudacion')
            ]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
