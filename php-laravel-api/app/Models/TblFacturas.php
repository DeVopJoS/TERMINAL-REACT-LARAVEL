<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblFacturas extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_facturas';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'factura_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["n","fecha_de_la_factura","n_de_la_factura","codigo_de_autorizacion","nit_ci_cliente","complemento","nombre_o_razon_social","importe_total_de_la_venta","importe_ice","importe_iehd","importe_ipj","tasas","otros_no_sujetos_al_iva","exportaciones_y_operaciones_exentas","ventas_gravadas_a_tasa_cero","subtotal","descuentos_bonificaciones_y_rebajas_sujetas_al_iva","importe_gift_card","importe_base_para_debito_fiscal","debito_fiscal","estado","codigo_de_control","tipo_de_venta","con_derecho_a_credito_fiscal","estado_consolidacion","fecha_registro","factura_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(factura_id AS TEXT) LIKE ?  OR 
				codigo_de_autorizacion LIKE ?  OR 
				nit_ci_cliente LIKE ?  OR 
				complemento LIKE ?  OR 
				nombre_o_razon_social LIKE ?  OR 
				estado LIKE ?  OR 
				codigo_de_control LIKE ?  OR 
				tipo_de_venta LIKE ?  OR 
				con_derecho_a_credito_fiscal LIKE ?  OR 
				estado_consolidacion LIKE ?  OR 
				factura_estado LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%"
		];
		//setting search conditions
		$query->whereRaw($search_condition, $search_params);
	}
	

	/**
     * return list page fields of the model.
     * 
     * @return array
     */
	public static function listFields(){
		return [ 
			"factura_id", 
			"n", 
			"fecha_de_la_factura", 
			"n_de_la_factura", 
			"codigo_de_autorizacion", 
			"nit_ci_cliente", 
			"complemento", 
			"nombre_o_razon_social", 
			"importe_total_de_la_venta", 
			"importe_ice", 
			"importe_iehd", 
			"importe_ipj", 
			"tasas", 
			"otros_no_sujetos_al_iva", 
			"exportaciones_y_operaciones_exentas", 
			"ventas_gravadas_a_tasa_cero", 
			"subtotal", 
			"descuentos_bonificaciones_y_rebajas_sujetas_al_iva", 
			"importe_gift_card", 
			"importe_base_para_debito_fiscal", 
			"debito_fiscal", 
			"estado", 
			"codigo_de_control", 
			"tipo_de_venta", 
			"con_derecho_a_credito_fiscal", 
			"estado_consolidacion", 
			"fecha_registro", 
			"factura_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"factura_id", 
			"n", 
			"fecha_de_la_factura", 
			"n_de_la_factura", 
			"codigo_de_autorizacion", 
			"nit_ci_cliente", 
			"complemento", 
			"nombre_o_razon_social", 
			"importe_total_de_la_venta", 
			"importe_ice", 
			"importe_iehd", 
			"importe_ipj", 
			"tasas", 
			"otros_no_sujetos_al_iva", 
			"exportaciones_y_operaciones_exentas", 
			"ventas_gravadas_a_tasa_cero", 
			"subtotal", 
			"descuentos_bonificaciones_y_rebajas_sujetas_al_iva", 
			"importe_gift_card", 
			"importe_base_para_debito_fiscal", 
			"debito_fiscal", 
			"estado", 
			"codigo_de_control", 
			"tipo_de_venta", 
			"con_derecho_a_credito_fiscal", 
			"estado_consolidacion", 
			"fecha_registro", 
			"factura_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"factura_id", 
			"n", 
			"fecha_de_la_factura", 
			"n_de_la_factura", 
			"codigo_de_autorizacion", 
			"nit_ci_cliente", 
			"complemento", 
			"nombre_o_razon_social", 
			"importe_total_de_la_venta", 
			"importe_ice", 
			"importe_iehd", 
			"importe_ipj", 
			"tasas", 
			"otros_no_sujetos_al_iva", 
			"exportaciones_y_operaciones_exentas", 
			"ventas_gravadas_a_tasa_cero", 
			"subtotal", 
			"descuentos_bonificaciones_y_rebajas_sujetas_al_iva", 
			"importe_gift_card", 
			"importe_base_para_debito_fiscal", 
			"debito_fiscal", 
			"estado", 
			"codigo_de_control", 
			"tipo_de_venta", 
			"con_derecho_a_credito_fiscal", 
			"estado_consolidacion", 
			"fecha_registro", 
			"factura_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"factura_id", 
			"n", 
			"fecha_de_la_factura", 
			"n_de_la_factura", 
			"codigo_de_autorizacion", 
			"nit_ci_cliente", 
			"complemento", 
			"nombre_o_razon_social", 
			"importe_total_de_la_venta", 
			"importe_ice", 
			"importe_iehd", 
			"importe_ipj", 
			"tasas", 
			"otros_no_sujetos_al_iva", 
			"exportaciones_y_operaciones_exentas", 
			"ventas_gravadas_a_tasa_cero", 
			"subtotal", 
			"descuentos_bonificaciones_y_rebajas_sujetas_al_iva", 
			"importe_gift_card", 
			"importe_base_para_debito_fiscal", 
			"debito_fiscal", 
			"estado", 
			"codigo_de_control", 
			"tipo_de_venta", 
			"con_derecho_a_credito_fiscal", 
			"estado_consolidacion", 
			"fecha_registro", 
			"factura_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"factura_id", 
			"n", 
			"fecha_de_la_factura", 
			"n_de_la_factura", 
			"codigo_de_autorizacion", 
			"nit_ci_cliente", 
			"complemento", 
			"nombre_o_razon_social", 
			"importe_total_de_la_venta", 
			"importe_ice", 
			"importe_iehd", 
			"importe_ipj", 
			"tasas", 
			"otros_no_sujetos_al_iva", 
			"exportaciones_y_operaciones_exentas", 
			"ventas_gravadas_a_tasa_cero", 
			"subtotal", 
			"descuentos_bonificaciones_y_rebajas_sujetas_al_iva", 
			"importe_gift_card", 
			"importe_base_para_debito_fiscal", 
			"debito_fiscal", 
			"estado", 
			"codigo_de_control", 
			"tipo_de_venta", 
			"con_derecho_a_credito_fiscal", 
			"estado_consolidacion", 
			"fecha_registro", 
			"factura_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
