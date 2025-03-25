<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblEdificioAmbiente extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_edificio_ambiente';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'ambiente_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["seccion_id","ambiente_nombre","ambiente_tamano","ambiente_tipo_uso","ambiente_precio_alquiler","ambiente_codigo_interno","ambiente_superficie_m2","ambiente_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(ambiente_id AS TEXT) LIKE ?  OR 
				ambiente_nombre LIKE ?  OR 
				ambiente_tipo_uso LIKE ?  OR 
				ambiente_codigo_interno LIKE ?  OR 
				ambiente_estado LIKE ? 
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
			"ambiente_id", 
			"seccion_id", 
			"ambiente_nombre", 
			"ambiente_tamano", 
			"ambiente_tipo_uso", 
			"ambiente_precio_alquiler", 
			"ambiente_codigo_interno", 
			"ambiente_superficie_m2", 
			"ambiente_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"ambiente_id", 
			"seccion_id", 
			"ambiente_nombre", 
			"ambiente_tamano", 
			"ambiente_tipo_uso", 
			"ambiente_precio_alquiler", 
			"ambiente_codigo_interno", 
			"ambiente_superficie_m2", 
			"ambiente_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"ambiente_id", 
			"seccion_id", 
			"ambiente_nombre", 
			"ambiente_tamano", 
			"ambiente_tipo_uso", 
			"ambiente_precio_alquiler", 
			"ambiente_codigo_interno", 
			"ambiente_superficie_m2", 
			"ambiente_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"ambiente_id", 
			"seccion_id", 
			"ambiente_nombre", 
			"ambiente_tamano", 
			"ambiente_tipo_uso", 
			"ambiente_precio_alquiler", 
			"ambiente_codigo_interno", 
			"ambiente_superficie_m2", 
			"ambiente_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"ambiente_id", 
			"seccion_id", 
			"ambiente_nombre", 
			"ambiente_tamano", 
			"ambiente_tipo_uso", 
			"ambiente_precio_alquiler", 
			"ambiente_codigo_interno", 
			"ambiente_superficie_m2", 
			"ambiente_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
