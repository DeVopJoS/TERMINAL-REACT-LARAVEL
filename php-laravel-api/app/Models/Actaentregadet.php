<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Actaentregadet extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'actaentregadet';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'aed_actaid';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["ae_actaid","servicio_id","aed_desdenumero","aed_hastanumero","aed_vendidohasta","aed_cantidad","aed_importebs","aed_estado","aed_preciounitario"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(aed_actaid AS TEXT) LIKE ?  OR 
				aed_estado LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%"
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
			"aed_actaid", 
			"ae_actaid", 
			"servicio_id", 
			"aed_desdenumero", 
			"aed_hastanumero", 
			"aed_vendidohasta", 
			"aed_cantidad", 
			"aed_importebs", 
			"aed_estado", 
			"aed_preciounitario" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"aed_actaid", 
			"ae_actaid", 
			"servicio_id", 
			"aed_desdenumero", 
			"aed_hastanumero", 
			"aed_vendidohasta", 
			"aed_cantidad", 
			"aed_importebs", 
			"aed_estado", 
			"aed_preciounitario" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"aed_actaid", 
			"ae_actaid", 
			"servicio_id", 
			"aed_desdenumero", 
			"aed_hastanumero", 
			"aed_vendidohasta", 
			"aed_cantidad", 
			"aed_importebs", 
			"aed_estado", 
			"aed_preciounitario" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"aed_actaid", 
			"ae_actaid", 
			"servicio_id", 
			"aed_desdenumero", 
			"aed_hastanumero", 
			"aed_vendidohasta", 
			"aed_cantidad", 
			"aed_importebs", 
			"aed_estado", 
			"aed_preciounitario" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"aed_actaid", 
			"ae_actaid", 
			"servicio_id", 
			"aed_desdenumero", 
			"aed_hastanumero", 
			"aed_vendidohasta", 
			"aed_cantidad", 
			"aed_importebs", 
			"aed_estado", 
			"aed_preciounitario" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
