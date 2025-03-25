<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblEdificio extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_edificio';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'edificio_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["edificio_nombre","edificio_direccion"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(edificio_id AS TEXT) LIKE ?  OR 
				edificio_nombre LIKE ?  OR 
				edificio_direccion LIKE ? 
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
			"edificio_id", 
			"edificio_nombre", 
			"edificio_direccion" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"edificio_id", 
			"edificio_nombre", 
			"edificio_direccion" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"edificio_id", 
			"edificio_nombre", 
			"edificio_direccion" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"edificio_id", 
			"edificio_nombre", 
			"edificio_direccion" 
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
			"edificio_nombre", 
			"edificio_direccion" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
