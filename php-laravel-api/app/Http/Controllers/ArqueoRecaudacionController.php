<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ArqueorecaudacionCab;
use App\Models\ArqueorecaudacionDet;
use App\Models\TblServicios;
use App\Models\TblPuntosRecaudacion;
use App\Models\Arqueocab;
use App\Models\Arqueodetcortes;
use App\Models\Actaentregacab;
use App\Models\Actaentregadet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class ArqueoRecaudacionController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Actaentregacab::with([
                'puntoRecaudacion:punto_recaud_id,puntorecaud_nombre', 
                'detalles' => function($q) {
                    $q->with('servicio:servicio_id,servicio_descripcion,servicio_abreviatura,servicio_precio_base');
                }
            ]);
            
            if (!$request->has('showClosed') || $request->showClosed === 'false') {
                $query->where('ae_estado', 'P');
            }
            
            if($request->search) {
                $search = trim($request->search);
                $query->where(function($query) use ($search) {
                    $query->where(DB::raw("CAST(ae_correlativo AS TEXT)"), 'like', "%$search%")
                          ->orWhere('ae_operador1erturno', 'like', "%$search%")
                          ->orWhere('ae_operador2doturno', 'like', "%$search%");
                });
            }
            
            if($request->fecha_desde && $request->fecha_hasta) {
                $fechaDesde = date('Y-m-d', strtotime($request->fecha_desde));
                $fechaHasta = date('Y-m-d', strtotime($request->fecha_hasta));
                $query->whereBetween(DB::raw("CAST(ae_fecha AS DATE)"), [$fechaDesde, $fechaHasta]);
            } else if($request->fecha) {
                $fecha = date('Y-m-d', strtotime($request->fecha));
                $query->where(DB::raw("CAST(ae_fecha AS DATE)"), '=', $fecha);
            }

            $records = $query->orderBy('ae_fecha', 'desc')
                           ->orderBy('ae_correlativo', 'desc')
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
            $arqueoCab->arqueoturno = $request->arqueoturno ?? 'M'; // Por defecto turno mañana
            $arqueoCab->arqueohorainicio = $request->arqueohorainicio;
            $arqueoCab->arqueohorafin = $request->arqueohorafin;
            $arqueoCab->arqueosupervisor = $request->arqueosupervisor;
            $arqueoCab->arqueorealizadopor = auth()->id() ?? 1;
            $arqueoCab->arqueorevisadopor = 1; // valor por defecto
            $arqueoCab->arqueorecaudaciontotal = $request->arqueorecaudaciontotal;
            $arqueoCab->arqueodiferencia = $request->arqueodiferencia;
            $arqueoCab->arqueoobservacion = $request->arqueoobservacion;
            $arqueoCab->arqueoestado = 'R'; // estado cambiado de 'A' a 'R'
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
    
            // Identificar las actas de entrega que tienen estado 'P' y al menos un detalle con estado 'L'
            $actasToUpdate = DB::table('actaentregacab as cab')
                ->join('actaentregadet as det', 'cab.ae_actaid', '=', 'det.ae_actaid')
                ->where('cab.ae_estado', 'P')
                ->where('det.aed_estado', 'L')
                ->select('cab.ae_actaid')
                ->distinct()
                ->pluck('ae_actaid');
    
            if ($actasToUpdate->isEmpty()) {
                throw new Exception('No se encontraron actas con estado "P" y detalles con estado "L" para actualizar.');
            }
    
            // Actualizar las cabeceras de actas de entrega de estado P a C
            $updatedCabRows = Actaentregacab::whereIn('ae_actaid', $actasToUpdate)
                ->update([
                    'arqueoid' => $arqueoid,
                    'ae_estado' => 'C', // estado cambiado de 'P' a 'C'
                    'ae_fechaarqueo' => now(),
                    'ae_usuarioarqueo' => auth()->id() ?? 1
                ]);
    
            // Actualizar los detalles correspondientes
            $updatedDetRows = DB::table('actaentregadet')
                ->whereIn('ae_actaid', $actasToUpdate)
                ->where('aed_estado', 'L')
                ->update([
                    'aed_estado' => 'C' // Actualizando el estado del detalle a 'C'
                ]);
    
            // Verificar que se actualizaron registros
            if (!$updatedCabRows || !$updatedDetRows) {
                throw new Exception('Error al actualizar los registros. Cabeceras actualizadas: ' . $updatedCabRows . ', Detalles actualizados: ' . $updatedDetRows);
            }
    
            // NUEVA FUNCIONALIDAD: Crear nuevos registros para detalles con diferencia > 0
            // Agrupar detalles por cabecera para evitar duplicados
            $detallesPorCabecera = DB::table('actaentregadet')
                ->whereIn('ae_actaid', $actasToUpdate)
                ->where('aed_estado', 'C')
                ->whereRaw('(aed_hastanumero - aed_desdenumero + 1) - aed_cantidad > 0')
                ->get()
                ->groupBy('ae_actaid');
    
            // Procesar cada cabecera que tiene detalles con diferencia
            foreach ($detallesPorCabecera as $actaId => $detalles) {
                // Obtener la cabecera original
                $cabeceraOriginal = DB::table('actaentregacab')
                    ->where('ae_actaid', $actaId)
                    ->first();
                
                if (!$cabeceraOriginal) {
                    continue; // Saltar si no se encuentra la cabecera
                }
                
                // Generar nuevo ID para la cabecera (una sola vez por grupo de detalles)
                $nuevoActaId = DB::table('actaentregacab')->max('ae_actaid') + 1;
                
                // Insertar nueva cabecera con estado 'A' (una sola vez por grupo de detalles)
                DB::table('actaentregacab')->insert([
                    'ae_actaid' => $nuevoActaId,
                    'ae_correlativo' => $cabeceraOriginal->ae_correlativo,
                    'punto_recaud_id' => $cabeceraOriginal->punto_recaud_id,
                    'ae_fecha' => now()->toDateString(),
                    'ae_grupo' => $cabeceraOriginal->ae_grupo,
                    'ae_operador1erturno' => $cabeceraOriginal->ae_operador1erturno,
                    'ae_operador2doturno' => $cabeceraOriginal->ae_operador2doturno,
                    'ae_cambiobs' => $cabeceraOriginal->ae_cambiobs,
                    'ae_cajachicabs' => $cabeceraOriginal->ae_cajachicabs,
                    'ae_llaves' => $cabeceraOriginal->ae_llaves,
                    'ae_fechero' => $cabeceraOriginal->ae_fechero,
                    'ae_tampo' => $cabeceraOriginal->ae_tampo,
                    'ae_candados' => $cabeceraOriginal->ae_candados,
                    'ae_observacion' => $cabeceraOriginal->ae_observacion,
                    'ae_recaudaciontotalbs' => $cabeceraOriginal->ae_recaudaciontotalbs,
                    'ae_usuario' => auth()->id() ?? 1,
                    'ae_usuarioarqueo' => null,
                    'ae_fecharegistro' => now(),
                    'ae_fechaarqueo' => null,
                    'ae_estado' => 'P',
                    'arqueoid' => null
                ]);
                
                // Insertar todos los detalles correspondientes a esta cabecera
                foreach ($detalles as $detalle) {
                    // Generar nuevo ID para cada detalle
                    $nuevoDetalleId = DB::table('actaentregadet')->max('aed_actaid') + 1;
                    
                    // Insertar nuevo detalle con estado 'A' y vinculado a la nueva cabecera
                    DB::table('actaentregadet')->insert([
                        'aed_actaid' => $nuevoDetalleId,
                        'ae_actaid' => $nuevoActaId, // Usar el mismo nuevo ID de cabecera para todos los detalles
                        'servicio_id' => $detalle->servicio_id,
                        'aed_desdenumero' => $detalle->aed_hastanumero+$detalle->aed_cantidad,// Asignar el mismo número de inicio
                        'aed_hastanumero' => $detalle->aed_hastanumero,
                        'aed_vendidohasta' => $detalle->aed_vendidohasta,
                        'aed_cantidad' => $detalle->aed_hastanumero-$detalle->aed_vendidohasta,
                        'aed_importebs' => $detalle->aed_importebs,
                        'aed_estado' => 'P',
                        'aed_preciounitario' => $detalle->aed_preciounitario
                    ]);
                }
            }
    
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
            $estado = $request->estado ?? 'P';
            
            // Consultar primero si existen actas con el estado especificado
            $existenActas = DB::table('actaentregacab')
                ->where('ae_estado', $estado)
                ->count();

            if ($existenActas == 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay actas con estado "' . $estado . '".',
                    'debug_info' => [
                        'estado_consultado' => $estado,
                        'query' => "SELECT COUNT(*) FROM actaentregacab WHERE ae_estado = '{$estado}'"
                    ]
                ]);
            }
            
            // Obtener resumen por servicios
            $resumen = DB::table('actaentregadet as det')
                ->join('actaentregacab as cab', 'det.ae_actaid', '=', 'cab.ae_actaid')
                ->join('tbl_servicios as srv', 'det.servicio_id', '=', 'srv.servicio_id')
                ->where('cab.ae_estado', $estado)
                ->where('det.aed_estado', 'L')
                ->select(
                    'srv.servicio_id',
                    'srv.servicio_abreviatura as codigo',
                    'srv.servicio_descripcion as nombre',
                    DB::raw('SUM(det.aed_cantidad) as cantidad_total'),
                    DB::raw('SUM(det.aed_importebs) as importe_total')
                )
                ->groupBy('srv.servicio_id', 'srv.servicio_abreviatura', 'srv.servicio_descripcion')
                ->orderBy('srv.servicio_descripcion')
                ->get();
                
            //Obtener detalle por operadores con ambos nombres de operadores
            $operadores = DB::table('actaentregacab as cab')
                ->join('actaentregadet as det', 'cab.ae_actaid', '=', 'det.ae_actaid')
                ->join('tbl_puntos_recaudacion as pr', 'cab.punto_recaud_id', '=', 'pr.punto_recaud_id')
                ->join('tbl_servicios as srv', 'det.servicio_id', '=', 'srv.servicio_id')
                ->where('cab.ae_estado', $estado)
                ->where('det.aed_estado', 'L')
                ->select(
                    'cab.ae_actaid',
                    'cab.ae_correlativo',
                    'cab.ae_operador1erturno',
                    'cab.ae_operador2doturno',
                    DB::raw('COALESCE(cab.ae_operador1erturno, cab.ae_operador2doturno) as operador'),
                    'pr.puntorecaud_nombre as punto',
                    'srv.servicio_abreviatura as codigo',
                    'det.aed_cantidad as cantidad',
                    'det.aed_importebs as importe'
                )
                ->orderBy('operador')
                ->orderBy('pr.puntorecaud_nombre')
                ->get();
            
            // Verificar que existan recaudaciones
            if ($resumen->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay actas con detalles para el estado "' . $estado . '"'
                ]);
            }
                
            return response()->json([
                'success' => true,
                'resumen_servicios' => $resumen,
                'detalle_operadores' => $operadores
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener resumen: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString()
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
            // Modificado para obtener datos de actaentregacab
            $acta = Actaentregacab::with([
                'detalles.servicio',
                'puntoRecaudacion:punto_recaud_id,puntorecaud_nombre'
            ])->findOrFail($id);
            
            return response()->json($acta);
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
