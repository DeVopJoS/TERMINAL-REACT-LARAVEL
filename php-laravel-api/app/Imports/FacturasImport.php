<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class FacturasImport implements ToCollection, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Convertir la fecha al formato Y-m-d
            $fechaFactura = null;
            if (!empty($row['fecha_de_la_factura'])) {
                try {
                    $fechaFactura = Carbon::createFromFormat('d/m/Y', $row['fecha_de_la_factura'])->format('Y-m-d');
                } catch (\Exception $e) {
                    try {
                        $fechaFactura = Carbon::parse($row['fecha_de_la_factura'])->format('Y-m-d');
                    } catch (\Exception $e) {
                        $fechaFactura = null;
                    }
                }
            }

            // Corregimos la asignación de campos problemáticos
            $numeroFactura = null;
            if (isset($row['n_de_la_factura'])) {
                $numeroFactura = $row['n_de_la_factura'];
            } elseif (isset($row['no_de_la_factura'])) {
                $numeroFactura = $row['no_de_la_factura'];
            }
            
            $nitCi = null;
            if (isset($row['nit__ci_cliente'])) {
                $nitCi = $row['nit__ci_cliente'];
            } elseif (isset($row['nit_ci_cliente'])) {
                $nitCi = $row['nit_ci_cliente'];
            }

            // Insertar datos en la tabla facturastmp
            DB::table('facturastmp')->insert([
                'numero_registro' => $row['n'] ?? null,
                'fecha_factura' => $fechaFactura,
                'numero_factura' => $numeroFactura,
                'codigo_autorizacion' => $row['codigo_de_autorizacion'] ?? null,
                'nit_ci' => $nitCi,
                'complemento' => $row['complemento'] ?? null,
                'nombre_razon_social' => $row['nombre_o_razon_social'] ?? null,
                'importe_total_venta' => $this->parseNumeric($row['importe_total_de_la_venta']),
                'importe_ice' => $this->parseNumeric($row['importe_ice']),
                'importe_iehd' => $this->parseNumeric($row['importe_iehd']),
                'importe_ipj' => $this->parseNumeric($row['importe_ipj']),
                'tasas' => $this->parseNumeric($row['tasas']),
                'otros_no_sujetos_iva' => $this->parseNumeric($row['otros_no_sujetos_al_iva']),
                'exportaciones_operaciones_exentas' => $this->parseNumeric($row['exportaciones_y_operaciones_exentas']),
                'ventas_gravadas_tasa_cero' => $this->parseNumeric($row['ventas_gravadas_a_tasa_cero']),
                'subtotal' => $this->parseNumeric($row['subtotal']),
                'descuentos_bonificaciones_rebajas' => $this->parseNumeric($row['descuentos_bonificaciones_y_rebajas_sujetas_al_iva']),
                'importe_gift_card' => $this->parseNumeric($row['importe_gift_card']),
                'importe_base_debito_fiscal' => $this->parseNumeric($row['importe_base_para_debito_fiscal']),
                'debito_fiscal' => $this->parseNumeric($row['debito_fiscal']),
                'estado' => $row['estado'] ?? null,
                'codigo_control' => $row['codigo_de_control'] ?? null,
                'tipo_venta' => $row['tipo_de_venta'] ?? null,
                'derecho_credito_fiscal' => $row['con_derecho_a_credito_fiscal'] ?? null,
                'estado_consolidacion' => $row['estado_consolidacion'] ?? null,
                'fecha_registro' => now()
            ]);
        }
    }

    /**
     * Convierte valores numéricos de string a float
     */
    private function parseNumeric($value)
    {
        if (empty($value)) return 0;
        
        // Eliminar posibles caracteres no numéricos excepto punto y coma
        $value = preg_replace('/[^\d.,]/', '', $value);
        // Reemplazar coma por punto
        $value = str_replace(',', '.', $value);
        
        return (float) $value;
    }
}
