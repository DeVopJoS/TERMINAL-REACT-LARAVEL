<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblFacturaDetalle extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_factura_detalle';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'detalle_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["factura_id","arrendamiento_id","fact_detalle_periodo_pago","fact_detalle_canon_alquiler","fact_detalle_morosidad_penalidad","fact_detalle_dias_morosidad","fact_detalle_total_mora","fact_detalle_importe_bs","fact_detalle_observaciones"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(detalle_id AS TEXT) LIKE ?  OR 
				fact_detalle_periodo_pago LIKE ?  OR 
				fact_detalle_observaciones LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%"
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
			"detalle_id", 
			"factura_id", 
			"arrendamiento_id", 
			"fact_detalle_periodo_pago", 
			"fact_detalle_canon_alquiler", 
			"fact_detalle_morosidad_penalidad", 
			"fact_detalle_dias_morosidad", 
			"fact_detalle_total_mora", 
			"fact_detalle_importe_bs", 
			"fact_detalle_observaciones" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"detalle_id", 
			"factura_id", 
			"arrendamiento_id", 
			"fact_detalle_periodo_pago", 
			"fact_detalle_canon_alquiler", 
			"fact_detalle_morosidad_penalidad", 
			"fact_detalle_dias_morosidad", 
			"fact_detalle_total_mora", 
			"fact_detalle_importe_bs", 
			"fact_detalle_observaciones" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"detalle_id", 
			"factura_id", 
			"arrendamiento_id", 
			"fact_detalle_periodo_pago", 
			"fact_detalle_canon_alquiler", 
			"fact_detalle_morosidad_penalidad", 
			"fact_detalle_dias_morosidad", 
			"fact_detalle_total_mora", 
			"fact_detalle_importe_bs", 
			"fact_detalle_observaciones" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"detalle_id", 
			"factura_id", 
			"arrendamiento_id", 
			"fact_detalle_periodo_pago", 
			"fact_detalle_canon_alquiler", 
			"fact_detalle_morosidad_penalidad", 
			"fact_detalle_dias_morosidad", 
			"fact_detalle_total_mora", 
			"fact_detalle_importe_bs", 
			"fact_detalle_observaciones" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"detalle_id", 
			"factura_id", 
			"arrendamiento_id", 
			"fact_detalle_periodo_pago", 
			"fact_detalle_canon_alquiler", 
			"fact_detalle_morosidad_penalidad", 
			"fact_detalle_dias_morosidad", 
			"fact_detalle_total_mora", 
			"fact_detalle_importe_bs", 
			"fact_detalle_observaciones" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
