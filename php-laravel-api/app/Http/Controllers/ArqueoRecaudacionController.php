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
                'puntoRecaudacion:punto_recaud_id,puntorecaud_nombre',
                'detalles' => function($q) {
                    $q->with('servicio:servicio_id,servicio_descripcion,servicio_abreviatura,servicio_precio_base');
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
                $fechaDesde = date('Y-m-d', strtotime($request->fecha_desde));
                $fechaHasta = date('Y-m-d', strtotime($request->fecha_hasta));
                $query->whereBetween(DB::raw("CAST(arqueofecha AS DATE)"), [$fechaDesde, $fechaHasta]);
            } else if($request->fecha) {
                $fecha = date('Y-m-d', strtotime($request->fecha));
                $query->where(DB::raw("CAST(arqueofecha AS DATE)"), '=', $fecha);
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
                'punto_recaud_id' => 'required|exists:tbl_puntos_recaudacion,punto_recaud_id',
                'arqueoturno' => 'required|in:M,T,N',
                'detalles' => 'required|array',
                'detalles.*.servicio_id' => 'required|exists:tbl_servicios,servicio_id',
                'detalles.*.arqueodetcantidad' => 'required|numeric|min:1',
                'detalles.*.arqueodettarifabs' => 'required|numeric|min:0',
                'detalles.*.arqueodetimportebs' => 'required|numeric|min:0'
            ]);

            // Asegurar que la fecha se guarde correctamente en formato Y-m-d
            $fecha = date('Y-m-d', strtotime($request->arqueofecha));

            $cabecera = ArqueorecaudacionCab::create([
                'arqueocorrelativo' => $request->arqueocorrelativo,
                'arqueofecha' => $fecha,
                'arqueoturno' => $request->arqueoturno,
                'punto_recaud_id' => $request->punto_recaud_id,
                'arqueonombreoperador' => $request->arqueonombreoperador,
                'arqueousuario' => 1, //valor por defecto
                'arqueofecharegistro' => now(),
                'arqueoestado' => 'P', // estado pendiente
                'arqueoid' => null, // esto se actualizará después
                'arqueonombresupervisor' => $request->arqueonombresupervisor ?? null
            ]);

            // procesar detalles
            foreach ($request->detalles as $detalle) {
                $cantidad = intval($detalle['arqueodetcantidad'] ?? 0);
                $tarifa = floatval($detalle['arqueodettarifabs'] ?? 0);
                $importe = floatval($detalle['arqueodetimportebs'] ?? 0);
                
                //Crear registro de detalle (arqueorecaudaciondet
                ArqueorecaudacionDet::create([
                    'arqueorecid' => $cabecera->arqueorecid, // Foreign key a arqueorecaudacioncab
                    'servicio_id' => $detalle['servicio_id'], // Foreign key a tbl_servicios
                    'arqueodetcantidad' => $cantidad,
                    'arqueodettarifabs' => $tarifa,
                    'arqueodetimportebs' => $importe,
                    'arqueoestado' => 'P' // estado pendiente
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

    // Método para generar el arqueo final
    public function generarArqueoFinal(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'arqueonumero' => 'required|integer',
                'arqueofecha' => 'required|date',
                'arqueoturno' => 'required|in:M,T,N',
                'arqueohorainicio' => 'required',
                'arqueohorafin' => 'required',
                'arqueosupervisor' => 'required|string',
                'cortes' => 'required|array',
                'arqueorecaudaciontotal' => 'required|numeric',
                'arqueodiferencia' => 'required|numeric',
                'arqueoobservacion' => 'nullable|string'
            ]);

            // Asegurar que la fecha esté en el formato correcto Y-m-d
            $fecha = date('Y-m-d', strtotime($request->arqueofecha));

            $arqueoid = DB::table('arqueocab')->max('arqueoid') + 1;
            $arqueodetcorteid = DB::table('arqueodetcortes')->max('arqueodetcorteid') + 1;

            $arqueoCab = new Arqueocab();
            $arqueoCab->arqueoid = $arqueoid;
            $arqueoCab->arqueonumero = $request->arqueonumero;
            $arqueoCab->arqueofecha = $fecha;
            $arqueoCab->arqueoturno = $request->arqueoturno;
            $arqueoCab->arqueohorainicio = $request->arqueohorainicio;
            $arqueoCab->arqueohorafin = $request->arqueohorafin;
            $arqueoCab->arqueosupervisor = 1; // valor por defecto
            $arqueoCab->arqueorealizadopor = auth()->id() ?? 1;
            $arqueoCab->arqueorevisadopor = 1; // valor por defecto
            $arqueoCab->arqueorecaudaciontotal = $request->arqueorecaudaciontotal;
            $arqueoCab->arqueodiferencia = $request->arqueodiferencia;
            $arqueoCab->arqueoobservacion = $request->arqueoobservacion;
            $arqueoCab->arqueoestado = 'A'; // estado activo
            $arqueoCab->arqueofecharegistro = now();
            $arqueoCab->arqueousuario = auth()->id() ?? 1;
            $arqueoCab->save();

            $arqueodetcortes = new Arqueodetcortes();
            $arqueodetcortes->arqueodetcorteid = $arqueodetcorteid;
            $arqueodetcortes->arqueoid = $arqueoid;
            $arqueodetcortes->arqueocorte200_00 = $request->cortes['arqueocorte200_00'] ?? 0;
            $arqueodetcortes->arqueocorte100_00 = $request->cortes['arqueocorte100_00'] ?? 0;
            $arqueodetcortes->arqueocorte050_00 = $request->cortes['arqueocorte050_00'] ?? 0;
            $arqueodetcortes->arqueocorte020_00 = $request->cortes['arqueocorte020_00'] ?? 0;
            $arqueodetcortes->arqueocorte010_00 = $request->cortes['arqueocorte010_00'] ?? 0;
            $arqueodetcortes->arqueocorte005_00 = $request->cortes['arqueocorte005_00'] ?? 0;
            $arqueodetcortes->arqueocorte002_00 = $request->cortes['arqueocorte002_00'] ?? 0;
            $arqueodetcortes->arqueocorte001_00 = $request->cortes['arqueocorte001_00'] ?? 0;
            $arqueodetcortes->arqueocorte000_50 = $request->cortes['arqueocorte000_50'] ?? 0;
            $arqueodetcortes->arqueocorte000_20 = $request->cortes['arqueocorte000_20'] ?? 0;
            $arqueodetcortes->arqueocorte000_10 = $request->cortes['arqueocorte000_10'] ?? 0;
            $arqueodetcortes->arqueoestado = 'A';
            $arqueodetcortes->save();

            $updatedRows = ArqueorecaudacionCab::where(DB::raw("CAST(arqueofecha AS DATE)"), '=', $fecha)
                ->where('arqueoturno', $request->arqueoturno)
                ->where('arqueoestado', 'P')
                ->update([
                    'arqueoid' => $arqueoid,
                    'arqueoestado' => 'A'
                ]);

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Arqueo final generado correctamente',
                'data' => [
                    'arqueoid' => $arqueoid,
                    'total_recaudado' => $request->arqueorecaudaciontotal,
                    'total_cortes' => $request->cortes,
                    'diferencia' => $request->arqueodiferencia
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
            
            try {
                $fecha = date('Y-m-d', strtotime($fecha));
            } catch (\Exception $e) {
            }
            
            // Modificar para solo obtener recaudaciones pendientes (estado = 'P')
            $resumen = DB::table('arqueorecaudaciondet as det')
                ->join('arqueorecaudacioncab as cab', 'det.arqueorecid', '=', 'cab.arqueorecid')
                ->join('tbl_servicios as srv', 'det.servicio_id', '=', 'srv.servicio_id')
                ->where(DB::raw("CAST(cab.arqueofecha AS DATE)"), '=', $fecha)
                ->where('cab.arqueoturno', $turno)
                ->where('cab.arqueoestado', 'P') // Solo recaudaciones pendientes
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
                
            // Modificar para solo obtener operadores con recaudaciones pendientes
            $operadores = DB::table('arqueorecaudacioncab as cab')
                ->join('arqueorecaudaciondet as det', 'cab.arqueorecid', '=', 'det.arqueorecid')
                ->join('tbl_puntos_recaudacion as pr', 'cab.punto_recaud_id', '=', 'pr.punto_recaud_id')
                ->join('tbl_servicios as srv', 'det.servicio_id', '=', 'srv.servicio_id')
                ->where(DB::raw("CAST(cab.arqueofecha AS DATE)"), '=', $fecha)
                ->where('cab.arqueoturno', $turno)
                ->where('cab.arqueoestado', 'P') // Solo recaudaciones pendientes
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
            
            // Verificar que existan recaudaciones pendientes
            if ($resumen->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay recaudaciones pendientes para la fecha (' . $fecha . ') y turno (' . $turno . ') indicados'
                ]);
            }
                
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
            
            return response()->json($servicios);
        } catch (Exception $e) {
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
                'puntoRecaudacion:punto_recaud_id,puntorecaud_nombre'
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

            // Asegurar que la fecha se guarde correctamente en formato Y-m-d
            $fecha = date('Y-m-d', strtotime($request->arqueofecha));

            $arqueo->update([
                'arqueofecha' => $fecha,
                'arqueonombreoperador' => $request->arqueonombreoperador,
                'punto_recaud_id' => $request->punto_recaud_id ?? $arqueo->punto_recaud_id
            ]);

            ArqueorecaudacionDet::where('arqueorecid', $id)->delete();
            
            foreach($request->detalles as $detalle) {
                $servicio_id = isset($detalle['servicio_id']) ? $detalle['servicio_id'] : null;
                if (!$servicio_id) continue;
                
                $servicio = TblServicios::find($servicio_id);
                if (!$servicio) {
                    throw new Exception('Servicio no encontrado: ' . $servicio_id);
                }
                
                $cantidad = isset($detalle['cantidad']) ? intval($detalle['cantidad']) : 
                           (isset($detalle['arqueodetcantidad']) ? intval($detalle['arqueodetcantidad']) : 0);
                
                $tarifa = isset($detalle['precio']) ? floatval($detalle['precio']) : 
                         (isset($detalle['arqueodettarifabs']) ? floatval($detalle['arqueodettarifabs']) : $servicio->servicio_precio_base);
                
                $importe = $cantidad * $tarifa;
                
                ArqueorecaudacionDet::create([
                    'arqueorecid' => $id,
                    'servicio_id' => $servicio_id,
                    'arqueodetcantidad' => $cantidad,
                    'arqueodettarifabs' => $tarifa,
                    'arqueodetimportebs' => $importe,
                    'arqueoestado' => 'P'
                ]);
            }

            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Arqueo actualizado correctamente',
                'data' => $arqueo->load('detalles.servicio', 'puntoRecaudacion')
            ]);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar arqueo: ' . $e->getMessage()
            ], 500);
        }
    }
}
