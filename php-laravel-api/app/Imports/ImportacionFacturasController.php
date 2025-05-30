<?php

namespace App\Imports;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\FacturasImport;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class ImportacionFacturasController extends Controller
{
    /**
     * Importa facturastmp desde un archivo CSV
     */
    public function importarFacturas(Request $request)
    {
        if (!$request->hasFile('archivo')) {
            return response()->json([
                'message' => 'No se ha proporcionado ningún archivo',
                'status' => 'error'
            ], 400);
        }

        $archivo = $request->file('archivo');

        // Validar que es un archivo CSV
        $extension = $archivo->getClientOriginalExtension();
        if ($extension !== 'csv' && $extension !== 'xlsx' && $extension !== 'xls') {
            return response()->json([
                'message' => 'El archivo debe ser CSV, XLSX o XLS',
                'status' => 'error'
            ], 400);
        }

        try {
            $registrosAntes = DB::table('facturastmp')->count();
            // Configuración de importación
            $importOptions = [
                'input_encoding' => 'UTF-8',
                'delimiter' => ',',
                'enclosure' => '"'
            ];

            // Importar datos
            Excel::import(new FacturasImport, $archivo, null, \Maatwebsite\Excel\Excel::CSV, $importOptions);

            $registrosDespues = DB::table('facturastmp')->count();
            $registrosImportados = $registrosDespues - $registrosAntes;

            $registrosFaltantes = DB::table('facturastmp')
                ->whereNull('numero_factura')
                ->orWhereNull('nit_ci')
                ->count();

            $message = "Se importaron $registrosImportados registros correctamente";
            if ($registrosFaltantes > 0) {
                $message .= ". Atención: $registrosFaltantes registros tienen campos faltantes (Nº DE LA FACTURA o NIT/CI CLIENTE).";
            }

            return response()->json([
                'message' => $message,
                'registros_importados' => $registrosImportados,
                'registros_con_campos_faltantes' => $registrosFaltantes,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {            
            return response()->json([
                'message' => 'Error al procesar el archivo: ' . $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }
}