<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblProrrogaSolicitudes extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_prorroga_solicitudes';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'prorroga_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["arrendatario_id","prorroga_solicitud_solicitud_fecha","prorroga_solicitud_fecha_propuesta_pago","prorroga_solicitud_observaciones","prorroga_solicitud_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(prorroga_id AS TEXT) LIKE ?  OR 
				prorroga_solicitud_observaciones LIKE ?  OR 
				prorroga_solicitud_estado LIKE ? 
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
			"prorroga_id", 
			"arrendatario_id", 
			"prorroga_solicitud_solicitud_fecha", 
			"prorroga_solicitud_fecha_propuesta_pago", 
			"prorroga_solicitud_observaciones", 
			"prorroga_solicitud_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"prorroga_id", 
			"arrendatario_id", 
			"prorroga_solicitud_solicitud_fecha", 
			"prorroga_solicitud_fecha_propuesta_pago", 
			"prorroga_solicitud_observaciones", 
			"prorroga_solicitud_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"prorroga_id", 
			"arrendatario_id", 
			"prorroga_solicitud_solicitud_fecha", 
			"prorroga_solicitud_fecha_propuesta_pago", 
			"prorroga_solicitud_observaciones", 
			"prorroga_solicitud_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"prorroga_id", 
			"arrendatario_id", 
			"prorroga_solicitud_solicitud_fecha", 
			"prorroga_solicitud_fecha_propuesta_pago", 
			"prorroga_solicitud_observaciones", 
			"prorroga_solicitud_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"prorroga_id", 
			"arrendatario_id", 
			"prorroga_solicitud_solicitud_fecha", 
			"prorroga_solicitud_fecha_propuesta_pago", 
			"prorroga_solicitud_observaciones", 
			"prorroga_solicitud_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
