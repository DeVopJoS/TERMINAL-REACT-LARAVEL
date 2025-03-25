<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblEdificioSeccion extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_edificio_seccion';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'seccion_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["nivel_id","seccion_nombre","seccion_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(seccion_id AS TEXT) LIKE ?  OR 
				seccion_nombre LIKE ?  OR 
				seccion_estado LIKE ? 
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
			"seccion_id", 
			"nivel_id", 
			"seccion_nombre", 
			"seccion_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"seccion_id", 
			"nivel_id", 
			"seccion_nombre", 
			"seccion_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"seccion_id", 
			"nivel_id", 
			"seccion_nombre", 
			"seccion_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"seccion_id", 
			"nivel_id", 
			"seccion_nombre", 
			"seccion_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"seccion_id", 
			"nivel_id", 
			"seccion_nombre", 
			"seccion_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
