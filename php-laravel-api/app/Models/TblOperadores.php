<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblOperadores extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_operadores';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'operador_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["per_id","operador_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(operador_id AS TEXT) LIKE ?  OR 
				operador_estado LIKE ? 
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
			"operador_id", 
			"per_id", 
			"operador_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"operador_id", 
			"per_id", 
			"operador_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"operador_id", 
			"per_id", 
			"operador_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"operador_id", 
			"per_id", 
			"operador_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"operador_id", 
			"per_id", 
			"operador_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
