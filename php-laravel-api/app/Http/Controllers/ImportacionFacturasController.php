<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ImportacionFacturasController extends Controller
{
    /**
     * Importar facturas desde un archivo Excel
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function importarFacturas(Request $request)
    {
        try {
            // Validar la solicitud
            $validator = Validator::make($request->all(), [
                'facturas' => 'required|array',
                'facturas.*.numeroFactura' => 'required|string',
                'facturas.*.fecha' => 'required|date',
                'facturas.*.nitCi' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            $facturas = $request->input('facturas');
            $imported = 0;
            $errors = [];
            $details = [];

            // Iniciar transacción
            DB::beginTransaction();

            foreach ($facturas as $index => $factura) {
                try {
                    // Insertar la factura en la base de datos
                    $id = DB::table('facturas')->insertGetId([
                        'numero' => $factura['numero'] ?? null,
                        'fecha' => $factura['fecha'],
                        'numero_factura' => $factura['numeroFactura'],
                        'codigo_autorizacion' => $factura['codigoAutorizacion'] ?? null,
                        'nit_ci' => $factura['nitCi'],
                        'complemento' => $factura['complemento'] ?? null,
                        'nombre_razon_social' => $factura['nombreRazonSocial'] ?? null,
                        'importe_total' => $factura['importeTotal'] ?? 0,
                        'importe_ice' => $factura['importeIce'] ?? 0,
                        'importe_iehd' => $factura['importeIehd'] ?? 0,
                        'importe_ipj' => $factura['importeIpj'] ?? 0,
                        'tasas' => $factura['tasas'] ?? 0,
                        'otros_no_sujetos_iva' => $factura['otrosNoSujetosIva'] ?? 0,
                        'exportaciones_operaciones_exentas' => $factura['exportacionesOperacionesExentas'] ?? 0,
                        'ventas_gravadas_tasa_cero' => $factura['ventasGravadasTasaCero'] ?? 0,
                        'subtotal' => $factura['subtotal'] ?? 0,
                        'descuentos' => $factura['descuentos'] ?? 0,
                        'bonificaciones_rebajas' => $factura['bonificacionesRebajas'] ?? 0,
                        'importe_gift_card' => $factura['importeGiftCard'] ?? 0,
                        'importe_base_debito_fiscal' => $factura['importeBaseDebitoFiscal'] ?? 0,
                        'debito_fiscal' => $factura['debitoFiscal'] ?? 0,
                        'estado' => $factura['estado'] ?? null,
                        'codigo_control' => $factura['codigoControl'] ?? null,
                        'tipo_venta' => $factura['tipoVenta'] ?? null,
                        'derecho_credito_fiscal' => $factura['derechoCreditoFiscal'] ?? null,
                        'estado_consolidacion' => $factura['estadoConsolidacion'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $imported++;
                    $details[] = "Factura {$factura['numeroFactura']} importada correctamente";
                } catch (\Exception $e) {
                    Log::error("Error al importar factura: " . $e->getMessage());
                    $errors[] = "Error en fila " . ($index + 1) . ": " . $e->getMessage();
                }
            }

            // Si hay errores, revertir la transacción
            if (count($errors) > 0) {
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Error al importar algunas facturas',
                    'imported' => $imported,
                    'errors' => $errors,
                    'details' => $details
                ], 500);
            }

            // Confirmar la transacción
            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Importación completada',
                'imported' => $imported,
                'details' => $details
            ]);

        } catch (\Exception $e) {
            Log::error("Error general en importación: " . $e->getMessage());
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Error al importar facturas: ' . $e->getMessage()
            ], 500);
        }
    }
} 