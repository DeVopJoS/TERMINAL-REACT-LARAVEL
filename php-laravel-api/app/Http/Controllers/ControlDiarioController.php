<?php

namespace App\Http\Controllers;

use App\Models\Actaentregacab;
use App\Models\Actaentregadet;
use App\Models\Deposito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ControlDiarioController extends Controller
{
    public function obtenerTotales(Request $request)
    {
        try {
            $fecha = $request->fecha ?? date('Y-m-d');

            // Obtener totales de actas de entrega
            $totalActas = Actaentregacab::where('ae_fecha', $fecha)
                ->sum('ae_recaudaciontotalbs');

            // Obtener totales de prevaloradas
            $totalPrevaloradas = DB::table('actaentregadet as det')
                ->join('actaentregacab as cab', 'cab.ae_actaid', '=', 'det.ae_actaid')
                ->where('cab.ae_fecha', $fecha)
                ->sum('det.aed_importebs');

            // Obtener totales por punto de recaudación
            $totalesPorPunto = DB::table('actaentregacab as cab')
                ->join('tbl_puntos_recaudacion as pr', 'pr.punto_recaud_id', '=', 'cab.punto_recaud_id')
                ->where('cab.ae_fecha', $fecha)
                ->select(
                    'pr.punto_recaud_id',
                    'pr.puntorecaud_nombre',
                    DB::raw('SUM(cab.ae_recaudaciontotalbs) as total')
                )
                ->groupBy('pr.punto_recaud_id', 'pr.puntorecaud_nombre')
                ->get();

            // Obtener totales por servicio
            $totalesPorServicio = DB::table('actaentregadet as det')
                ->join('actaentregacab as cab', 'cab.ae_actaid', '=', 'det.ae_actaid')
                ->join('tbl_servicios as serv', 'serv.servicio_id', '=', 'det.servicio_id')
                ->where('cab.ae_fecha', $fecha)
                ->select(
                    'serv.servicio_id',
                    'serv.servicio_descripcion',
                    'serv.servicio_abreviatura',
                    DB::raw('SUM(det.aed_cantidad) as cantidad'),
                    DB::raw('SUM(det.aed_importebs) as total')
                )
                ->groupBy('serv.servicio_id', 'serv.servicio_descripcion', 'serv.servicio_abreviatura')
                ->get();

            // Obtener información del depósito para la fecha
            $deposito = Deposito::where('fecha_recaudacion', $fecha)->first();

            return response()->json([
                'fecha' => $fecha,
                'total_actas' => $totalActas,
                'total_prevaloradas' => $totalPrevaloradas,
                'diferencia' => $totalPrevaloradas - $totalActas,
                'por_punto' => $totalesPorPunto,
                'por_servicio' => $totalesPorServicio,
                'deposito' => $deposito
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function obtenerHistorial(Request $request)
    {
        try {
            $historial = DB::table('actaentregacab')
                ->select(
                    'ae_fecha as fecha',
                    DB::raw('SUM(ae_recaudaciontotalbs) as total'),
                    DB::raw('COUNT(*) as cantidad_actas')
                )
                ->groupBy('ae_fecha')
                ->orderBy('ae_fecha', 'desc')
                ->limit(30)
                ->get();

            foreach ($historial as &$dia) {
                $totalesPorServicio = DB::table('actaentregadet as det')
                    ->join('actaentregacab as cab', 'cab.ae_actaid', '=', 'det.ae_actaid')
                    ->join('tbl_servicios as serv', 'serv.servicio_id', '=', 'det.servicio_id')
                    ->where('cab.ae_fecha', $dia->fecha)
                    ->select(
                        'serv.servicio_descripcion',
                        DB::raw('SUM(det.aed_cantidad) as cantidad'),
                        DB::raw('SUM(det.aed_importebs) as total')
                    )
                    ->groupBy('serv.servicio_descripcion')
                    ->get();
                
                $dia->servicios = $totalesPorServicio;
                
                // Obtener depósito del día
                $deposito = Deposito::where('fecha_recaudacion', $dia->fecha)->first();
                $dia->deposito = $deposito;
            }

            return response()->json($historial);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function registrarDeposito(Request $request)
    {
        try {
            $request->validate([
                'fecha_recaudacion' => 'required|date',
                'fecha_deposito_1' => 'required|date',
                'numero_deposito_1' => 'required|string',
                'efectivo_1' => 'required|numeric',
                'fecha_deposito_2' => 'nullable|date',
                'numero_deposito_2' => 'nullable|string',
                'efectivo_2' => 'nullable|numeric',
                'depositantes' => 'nullable|string',
                'observacion' => 'nullable|string'
            ]);

            $totalEfectivo = $request->efectivo_1 + ($request->efectivo_2 ?? 0);

            // Verificar si ya existe un depósito para esta fecha
            $deposito = Deposito::where('fecha_recaudacion', $request->fecha_recaudacion)->first();

            if ($deposito) {
                // Actualizar depósito existente
                $deposito->update([
                    'fecha_deposito_1' => $request->fecha_deposito_1,
                    'numero_deposito_1' => $request->numero_deposito_1,
                    'efectivo_1' => $request->efectivo_1,
                    'fecha_deposito_2' => $request->fecha_deposito_2,
                    'numero_deposito_2' => $request->numero_deposito_2,
                    'efectivo_2' => $request->efectivo_2,
                    'total_efectivo' => $totalEfectivo,
                    'depositantes' => $request->depositantes,
                    'observacion' => $request->observacion
                ]);
            } else {
                // Crear nuevo depósito
                $codigo = 'DEP-' . date('Ymd', strtotime($request->fecha_recaudacion));
                
                Deposito::create([
                    'codigo' => $codigo,
                    'fecha_recaudacion' => $request->fecha_recaudacion,
                    'fecha_deposito_1' => $request->fecha_deposito_1,
                    'numero_deposito_1' => $request->numero_deposito_1,
                    'efectivo_1' => $request->efectivo_1,
                    'fecha_deposito_2' => $request->fecha_deposito_2,
                    'numero_deposito_2' => $request->numero_deposito_2,
                    'efectivo_2' => $request->efectivo_2,
                    'total_efectivo' => $totalEfectivo,
                    'depositantes' => $request->depositantes,
                    'observacion' => $request->observacion
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Depósito registrado correctamente'
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function obtenerReporteRango(Request $request)
    {
        try {
            $fechaDesde = $request->input('fecha_desde');
            $fechaHasta = $request->input('fecha_hasta');
            
            // Validar que ambas fechas existan y no estén vacías
            if (empty($fechaDesde) || empty($fechaHasta)) {
                return response()->json([
                    'error' => 'Debe seleccionar ambas fechas (desde y hasta)'
                ], 400);
            }

            try {
                $fechaDesde = date('Y-m-d', strtotime($fechaDesde));
                $fechaHasta = date('Y-m-d', strtotime($fechaHasta));
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Formato de fecha inválido'
                ], 400);
            }

            // Asegurarse que fecha_hasta no es menor que fecha_desde
            if (strtotime($fechaHasta) < strtotime($fechaDesde)) {
                return response()->json([
                    'error' => 'La fecha final no puede ser menor a la fecha inicial'
                ], 400);
            }

            // Verificar rango máximo de 90 días
            $diff = (new \DateTime($fechaDesde))->diff(new \DateTime($fechaHasta));
            if ($diff->days > 90) {
                return response()->json([
                    'error' => 'El rango de fechas no debe exceder los 90 días'
                ], 400);
            }

            try {
                $fechas = [];
                $currentDate = new \DateTime($fechaDesde);
                $endDate = new \DateTime($fechaHasta);
                $endDate->modify('+1 day');
                
                while ($currentDate < $endDate) {
                    $fechas[] = $currentDate->format('Y-m-d');
                    $currentDate->modify('+1 day');
                }
                
                $result = [];
                
                foreach ($fechas as $fecha) {
                    $actas = DB::table('actaentregacab')
                        ->select(
                            DB::raw('SUM(ae_recaudaciontotalbs) as total_actas'),
                            DB::raw('COUNT(*) as cantidad_actas')
                        )
                        ->whereDate('ae_fecha', $fecha)
                        ->first();
                    
                    if (!$actas || ($actas->total_actas == 0 && $actas->cantidad_actas == 0)) {
                        continue;
                    }
                    
                    $prevaloradas = DB::table('actaentregadet as det')
                        ->join('actaentregacab as cab', 'cab.ae_actaid', '=', 'det.ae_actaid')
                        ->whereDate('cab.ae_fecha', $fecha)
                        ->sum('det.aed_importebs');
                    
                    $fechaFormateada = date('d/m/Y', strtotime($fecha));
                    $deposito = Deposito::whereDate('fecha_recaudacion', $fecha)->first();
                    
                    $item = [
                        'fecha' => $fechaFormateada,
                        'total_actas' => floatval($actas->total_actas) ?? 0,
                        'cantidad_actas' => intval($actas->cantidad_actas) ?? 0,
                        'total_prevaloradas' => floatval($prevaloradas) ?? 0,
                        'deposito_codigo' => null,
                        'fecha_deposito_1' => null,
                        'numero_deposito_1' => null,
                        'efectivo_1' => 0,
                        'fecha_deposito_2' => null,
                        'numero_deposito_2' => null,
                        'efectivo_2' => 0,
                        'total_efectivo' => 0,
                        'depositantes' => null,
                        'observacion' => null
                    ];
                    
                    if ($deposito) {
                        $item['deposito_codigo'] = $deposito->codigo;
                        $item['fecha_deposito_1'] = $deposito->fecha_deposito_1 ? date('d/m/Y', strtotime($deposito->fecha_deposito_1)) : null;
                        $item['numero_deposito_1'] = $deposito->numero_deposito_1;
                        $item['efectivo_1'] = floatval($deposito->efectivo_1) ?? 0;
                        $item['fecha_deposito_2'] = $deposito->fecha_deposito_2 ? date('d/m/Y', strtotime($deposito->fecha_deposito_2)) : null;
                        $item['numero_deposito_2'] = $deposito->numero_deposito_2;
                        $item['efectivo_2'] = floatval($deposito->efectivo_2) ?? 0;
                        $item['total_efectivo'] = floatval($deposito->total_efectivo) ?? 0;
                        $item['depositantes'] = $deposito->depositantes;
                        $item['observacion'] = $deposito->observacion;
                    }
                    
                    $result[] = $item;
                }
                
                usort($result, function($a, $b) {
                    $dateA = \DateTime::createFromFormat('d/m/Y', $a['fecha'])->format('Y-m-d');
                    $dateB = \DateTime::createFromFormat('d/m/Y', $b['fecha'])->format('Y-m-d');
                    return $dateA <=> $dateB;
                });
                
                return response()->json($result);
                
            } catch (\Exception $e) {
                throw $e;
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error generando reporte: ' . $e->getMessage()
            ], 500);
        }
    }

    public function reporteRango(Request $request)
    {
        try {
            $fechaDesde = $request->fecha_desde;
            $fechaHasta = $request->fecha_hasta;

            if (!$fechaDesde || !$fechaHasta) {
                return response()->json([]);
            }

            $datos = DB::table('actaentregacab as cab')
                ->join('tbl_puntos_recaudacion as pr', 'cab.punto_recaud_id', '=', 'pr.punto_recaud_id')
                ->leftJoin('tbl_depositos as dep', function($join) {
                    $join->on('cab.ae_fecha', '=', 'dep.fecha_recaudacion');
                })
                ->whereBetween(DB::raw('DATE(cab.ae_fecha)'), [$fechaDesde, $fechaHasta])
                ->select(
                    DB::raw("to_char(cab.ae_fecha, 'DD/MM/YYYY') as fecha"),
                    'cab.ae_recaudaciontotalbs as total_actas',
                    DB::raw("COALESCE(SUM(CASE WHEN det.servicio_id = 1 THEN det.aed_importebs ELSE 0 END), 0) as total_prevaloradas"),
                    'dep.total_efectivo',
                    'dep.numero_deposito_1',
                    'dep.numero_deposito_2',
                    'dep.depositantes',
                    'dep.observacion'
                )
                ->leftJoin('actaentregadet as det', 'cab.ae_actaid', '=', 'det.ae_actaid')
                ->groupBy(
                    'cab.ae_fecha',
                    'cab.ae_recaudaciontotalbs',
                    'dep.total_efectivo',
                    'dep.numero_deposito_1',
                    'dep.numero_deposito_2',
                    'dep.depositantes',
                    'dep.observacion'
                )
                ->orderBy('cab.ae_fecha')
                ->get();

            $datos = $datos->map(function($item) {
                $item->total_actas = floatval($item->total_actas);
                $item->total_prevaloradas = floatval($item->total_prevaloradas);
                $item->total_efectivo = floatval($item->total_efectivo);
                return $item;
            });

            return response()->json($datos);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
