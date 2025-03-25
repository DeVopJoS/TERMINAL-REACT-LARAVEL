<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblEdificioNivel extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_edificio_nivel';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'nivel_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["edificio_id","nivel_nombre","nivel_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(nivel_id AS TEXT) LIKE ?  OR 
				nivel_nombre LIKE ?  OR 
				nivel_estado LIKE ? 
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
			"nivel_id", 
			"edificio_id", 
			"nivel_nombre", 
			"nivel_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"nivel_id", 
			"edificio_id", 
			"nivel_nombre", 
			"nivel_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"nivel_id", 
			"edificio_id", 
			"nivel_nombre", 
			"nivel_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"nivel_id", 
			"edificio_id", 
			"nivel_nombre", 
			"nivel_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"nivel_id", 
			"edificio_id", 
			"nivel_nombre", 
			"nivel_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
