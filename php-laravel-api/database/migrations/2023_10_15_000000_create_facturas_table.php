<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->string('numero')->nullable();
            $table->date('fecha');
            $table->string('numero_factura');
            $table->string('codigo_autorizacion')->nullable();
            $table->string('nit_ci');
            $table->string('complemento')->nullable();
            $table->string('nombre_razon_social')->nullable();
            $table->decimal('importe_total', 15, 2)->default(0);
            $table->decimal('importe_ice', 15, 2)->default(0);
            $table->decimal('importe_iehd', 15, 2)->default(0);
            $table->decimal('importe_ipj', 15, 2)->default(0);
            $table->decimal('tasas', 15, 2)->default(0);
            $table->decimal('otros_no_sujetos_iva', 15, 2)->default(0);
            $table->decimal('exportaciones_operaciones_exentas', 15, 2)->default(0);
            $table->decimal('ventas_gravadas_tasa_cero', 15, 2)->default(0);
            $table->decimal('subtotal', 15, 2)->default(0);
            $table->decimal('descuentos', 15, 2)->default(0);
            $table->decimal('bonificaciones_rebajas', 15, 2)->default(0);
            $table->decimal('importe_gift_card', 15, 2)->default(0);
            $table->decimal('importe_base_debito_fiscal', 15, 2)->default(0);
            $table->decimal('debito_fiscal', 15, 2)->default(0);
            $table->string('estado')->nullable();
            $table->string('codigo_control')->nullable();
            $table->string('tipo_venta')->nullable();
            $table->string('derecho_credito_fiscal')->nullable();
            $table->string('estado_consolidacion')->nullable();
            $table->timestamps();
            
            // Índices para mejorar el rendimiento de las consultas
            $table->index('numero_factura');
            $table->index('fecha');
            $table->index('nit_ci');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('facturas');
    }
} 