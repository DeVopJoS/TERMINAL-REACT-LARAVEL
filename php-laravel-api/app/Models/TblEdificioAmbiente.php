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
	protected $fillable = ["edificio_id","nivel_id","seccion_id","ambiente_nombre","ambiente_tamano","ambiente_tipo_uso","ambiente_precio_alquiler","ambiente_codigo_interno","ambiente_superficie_m2","ambiente_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(tbl_edificio_ambiente.ambiente_id AS TEXT) LIKE ?  OR 
				tbl_edificio_ambiente.ambiente_nombre LIKE ?  OR 
				tbl_edificio_ambiente.ambiente_tipo_uso LIKE ?  OR 
				tbl_edificio_ambiente.ambiente_codigo_interno LIKE ?  OR 
				tbl_edificio_ambiente.ambiente_estado LIKE ?  OR 
				CAST(tbl_edificio.edificio_id AS TEXT) LIKE ?  OR 
				tbl_edificio.edificio_nombre LIKE ?  OR 
				tbl_edificio.edificio_direccion LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%"
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
			"tbl_edificio_ambiente.ambiente_id AS ambiente_id", 
			"tbl_edificio_ambiente.edificio_id AS edificio_id", 
			"tbl_edificio_ambiente.nivel_id AS nivel_id", 
			"tbl_edificio_ambiente.seccion_id AS seccion_id", 
			"tbl_edificio_ambiente.ambiente_nombre AS ambiente_nombre", 
			"tbl_edificio_ambiente.ambiente_tamano AS ambiente_tamano", 
			"tbl_edificio_ambiente.ambiente_tipo_uso AS ambiente_tipo_uso", 
			"tbl_edificio_ambiente.ambiente_precio_alquiler AS ambiente_precio_alquiler", 
			"tbl_edificio_ambiente.ambiente_codigo_interno AS ambiente_codigo_interno", 
			"tbl_edificio_ambiente.ambiente_superficie_m2 AS ambiente_superficie_m2", 
			"tbl_edificio_ambiente.ambiente_estado AS ambiente_estado", 
			"tbl_edificio.edificio_id AS tbledificio_edificio_id", 
			"tbl_edificio.edificio_nombre AS tbledificio_edificio_nombre", 
			"tbl_edificio.edificio_direccion AS tbledificio_edificio_direccion" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"tbl_edificio_ambiente.ambiente_id AS ambiente_id", 
			"tbl_edificio_ambiente.edificio_id AS edificio_id", 
			"tbl_edificio_ambiente.nivel_id AS nivel_id", 
			"tbl_edificio_ambiente.seccion_id AS seccion_id", 
			"tbl_edificio_ambiente.ambiente_nombre AS ambiente_nombre", 
			"tbl_edificio_ambiente.ambiente_tamano AS ambiente_tamano", 
			"tbl_edificio_ambiente.ambiente_tipo_uso AS ambiente_tipo_uso", 
			"tbl_edificio_ambiente.ambiente_precio_alquiler AS ambiente_precio_alquiler", 
			"tbl_edificio_ambiente.ambiente_codigo_interno AS ambiente_codigo_interno", 
			"tbl_edificio_ambiente.ambiente_superficie_m2 AS ambiente_superficie_m2", 
			"tbl_edificio_ambiente.ambiente_estado AS ambiente_estado", 
			"tbl_edificio.edificio_id AS tbledificio_edificio_id", 
			"tbl_edificio.edificio_nombre AS tbledificio_edificio_nombre", 
			"tbl_edificio.edificio_direccion AS tbledificio_edificio_direccion" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"tbl_edificio_ambiente.ambiente_id AS ambiente_id", 
			"tbl_edificio_ambiente.edificio_id AS edificio_id", 
			"tbl_edificio_ambiente.nivel_id AS nivel_id", 
			"tbl_edificio_ambiente.seccion_id AS seccion_id", 
			"tbl_edificio_ambiente.ambiente_nombre AS ambiente_nombre", 
			"tbl_edificio_ambiente.ambiente_tamano AS ambiente_tamano", 
			"tbl_edificio_ambiente.ambiente_tipo_uso AS ambiente_tipo_uso", 
			"tbl_edificio_ambiente.ambiente_precio_alquiler AS ambiente_precio_alquiler", 
			"tbl_edificio_ambiente.ambiente_codigo_interno AS ambiente_codigo_interno", 
			"tbl_edificio_ambiente.ambiente_superficie_m2 AS ambiente_superficie_m2", 
			"tbl_edificio_ambiente.ambiente_estado AS ambiente_estado", 
			"tbl_edificio.edificio_id AS tbledificio_edificio_id", 
			"tbl_edificio.edificio_nombre AS tbledificio_edificio_nombre", 
			"tbl_edificio.edificio_direccion AS tbledificio_edificio_direccion" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"tbl_edificio_ambiente.ambiente_id AS ambiente_id", 
			"tbl_edificio_ambiente.edificio_id AS edificio_id", 
			"tbl_edificio_ambiente.nivel_id AS nivel_id", 
			"tbl_edificio_ambiente.seccion_id AS seccion_id", 
			"tbl_edificio_ambiente.ambiente_nombre AS ambiente_nombre", 
			"tbl_edificio_ambiente.ambiente_tamano AS ambiente_tamano", 
			"tbl_edificio_ambiente.ambiente_tipo_uso AS ambiente_tipo_uso", 
			"tbl_edificio_ambiente.ambiente_precio_alquiler AS ambiente_precio_alquiler", 
			"tbl_edificio_ambiente.ambiente_codigo_interno AS ambiente_codigo_interno", 
			"tbl_edificio_ambiente.ambiente_superficie_m2 AS ambiente_superficie_m2", 
			"tbl_edificio_ambiente.ambiente_estado AS ambiente_estado", 
			"tbl_edificio.edificio_id AS tbledificio_edificio_id", 
			"tbl_edificio.edificio_nombre AS tbledificio_edificio_nombre", 
			"tbl_edificio.edificio_direccion AS tbledificio_edificio_direccion" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"edificio_id", 
			"nivel_id", 
			"seccion_id", 
			"ambiente_nombre", 
			"ambiente_tamano", 
			"ambiente_tipo_uso", 
			"ambiente_precio_alquiler", 
			"ambiente_codigo_interno", 
			"ambiente_superficie_m2", 
			"ambiente_estado", 
			"ambiente_id" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
