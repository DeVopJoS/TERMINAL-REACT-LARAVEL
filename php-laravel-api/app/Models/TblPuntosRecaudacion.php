<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblPuntosRecaudacion extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_puntos_recaudacion';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'punto_recaud_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["puntorecaud_nombre","puntorecaud_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(punto_recaud_id AS TEXT) LIKE ?  OR 
				puntorecaud_nombre LIKE ?  OR 
				puntorecaud_estado LIKE ? 
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
			"punto_recaud_id", 
			"puntorecaud_nombre", 
			"puntorecaud_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"punto_recaud_id", 
			"puntorecaud_nombre", 
			"puntorecaud_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"punto_recaud_id", 
			"puntorecaud_nombre", 
			"puntorecaud_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"punto_recaud_id", 
			"puntorecaud_nombre", 
			"puntorecaud_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"punto_recaud_id", 
			"puntorecaud_nombre", 
			"puntorecaud_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
