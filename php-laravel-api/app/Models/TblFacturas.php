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
	protected $fillable = ["arrendatario_nombre","arrendatario_ci","factura_numero","factura_fecha_emision","factura_total","factura_fecha_pago","factura_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(factura_id AS TEXT) LIKE ?  OR 
				arrendatario_nombre LIKE ?  OR 
				arrendatario_ci LIKE ?  OR 
				factura_numero LIKE ?  OR 
				factura_estado LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%"
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
			"arrendatario_nombre", 
			"arrendatario_ci", 
			"factura_numero", 
			"factura_fecha_emision", 
			"factura_total", 
			"factura_fecha_pago", 
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
			"arrendatario_nombre", 
			"arrendatario_ci", 
			"factura_numero", 
			"factura_fecha_emision", 
			"factura_total", 
			"factura_fecha_pago", 
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
			"arrendatario_nombre", 
			"arrendatario_ci", 
			"factura_numero", 
			"factura_fecha_emision", 
			"factura_total", 
			"factura_fecha_pago", 
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
			"arrendatario_nombre", 
			"arrendatario_ci", 
			"factura_numero", 
			"factura_fecha_emision", 
			"factura_total", 
			"factura_fecha_pago", 
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
			"arrendatario_nombre", 
			"arrendatario_ci", 
			"factura_numero", 
			"factura_fecha_emision", 
			"factura_total", 
			"factura_fecha_pago", 
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
