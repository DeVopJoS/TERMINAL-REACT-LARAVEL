<?php

namespace App\Http\Controllers;

use App\Models\Actaentregacab;
use App\Models\Actaentregadet;
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

            return response()->json([
                'fecha' => $fecha,
                'total_actas' => $totalActas,
                'total_prevaloradas' => $totalPrevaloradas,
                'diferencia' => $totalPrevaloradas - $totalActas,
                'por_punto' => $totalesPorPunto,
                'por_servicio' => $totalesPorServicio
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
                'fecha' => 'required|date',
                'monto' => 'required|numeric',
                'observacion' => 'nullable|string'
            ]);

            $arqueoid = DB::table('arqueocab')->max('arqueoid') + 1;

            DB::table('arqueocab')->insert([
                'arqueoid' => $arqueoid,
                'arqueofecha' => $request->fecha,
                'arqueorecaudaciontotal' => $request->monto,
                'arqueoobservacion' => $request->observacion,
                'arqueoestado' => 'R',
                'arqueofecharegistro' => now(),
                'arqueousuario' => auth()->id()
            ]);

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
            $request->validate([
                'fecha_desde' => 'required|date',
                'fecha_hasta' => 'required|date'
            ]);

            $reporte = DB::table('actaentregacab as cab')
                ->whereBetween('cab.ae_fecha', [$request->fecha_desde, $request->fecha_hasta])
                ->select(
                    'cab.ae_fecha as fecha',
                    DB::raw('SUM(cab.ae_recaudaciontotalbs) as total_actas'),
                    DB::raw('COUNT(DISTINCT cab.ae_actaid) as cantidad_actas')
                )
                ->groupBy('cab.ae_fecha')
                ->orderBy('cab.ae_fecha')
                ->get();

            foreach ($reporte as &$dia) {
                // Obtener total prevaloradas
                $prevaloradas = DB::table('actaentregadet as det')
                    ->join('actaentregacab as cab', 'cab.ae_actaid', '=', 'det.ae_actaid')
                    ->where('cab.ae_fecha', $dia->fecha)
                    ->sum('det.aed_importebs');
                
                $dia->total_prevaloradas = $prevaloradas;

                // Obtener depósito del día
                $deposito = DB::table('arqueocab')
                    ->where('arqueofecha', $dia->fecha)
                    ->where('arqueoestado', 'R')
                    ->select('arqueorecaudaciontotal as monto_deposito', 'arqueoobservacion as observacion')
                    ->first();

                $dia->monto_deposito = $deposito ? $deposito->monto_deposito : 0;
                $dia->observacion = $deposito ? $deposito->observacion : null;
            }

            return response()->json($reporte);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
