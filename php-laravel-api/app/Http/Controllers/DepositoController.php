<?php

namespace App\Http\Controllers;

use App\Models\Deposito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepositoController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Deposito::query();
            
            if ($request->has('fecha_desde') && $request->has('fecha_hasta')) {
                $query->whereBetween('fecha_recaudacion', [$request->fecha_desde, $request->fecha_hasta]);
            }
            
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('codigo', 'like', "%$search%")
                      ->orWhere('numero_deposito_1', 'like', "%$search%")
                      ->orWhere('numero_deposito_2', 'like', "%$search%")
                      ->orWhere('depositantes', 'like', "%$search%");
                });
            }
            
            $depositos = $query->orderBy('fecha_recaudacion', 'desc')->get();
            
            return response()->json($depositos);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function store(Request $request)
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
            $totalRecaudacion = $request->total_recaudacion;
            
            // Calcular la diferencia actual
            $diferenciaMonto = $totalRecaudacion - $totalEfectivo;

            $codigo = 'DEP-' . date('Ymd', strtotime($request->fecha_recaudacion));
            
            $deposito = Deposito::create([
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

            return response()->json([
                'success' => true,
                'message' => 'Depósito guardado correctamente',
                'deposito' => $deposito
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function show($id)
    {
        try {
            $deposito = Deposito::findOrFail($id);
            return response()->json($deposito);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function update(Request $request, $id)
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

            $deposito = Deposito::findOrFail($id);
            $totalEfectivo = floatval($request->efectivo_1) + floatval($request->efectivo_2 ?? 0);
            $totalRecaudacion = floatval($request->total_recaudacion);
            
            // Asegurar que se calcule siempre la diferencia
            $diferenciaMonto = $totalRecaudacion - $totalEfectivo;

            $deposito->update([
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

            return response()->json([
                'success' => true,
                'message' => 'Depósito actualizado correctamente',
                'deposito' => $deposito->fresh() // Recargar el modelo con los datos actualizados
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    public function destroy($id)
    {
        try {
            $deposito = Deposito::findOrFail($id);
            $deposito->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Depósito eliminado correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
