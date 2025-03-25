<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblVehiculos extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_vehiculos';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'vehiculo_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["vehiculo_nombre","vehiculo_celular","vehiculo_placa"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(vehiculo_id AS TEXT) LIKE ?  OR 
				vehiculo_nombre LIKE ?  OR 
				vehiculo_celular LIKE ?  OR 
				vehiculo_placa LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%"
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
			"vehiculo_id", 
			"vehiculo_nombre", 
			"vehiculo_celular", 
			"vehiculo_placa" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"vehiculo_id", 
			"vehiculo_nombre", 
			"vehiculo_celular", 
			"vehiculo_placa" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"vehiculo_id", 
			"vehiculo_nombre", 
			"vehiculo_celular", 
			"vehiculo_placa" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"vehiculo_id", 
			"vehiculo_nombre", 
			"vehiculo_celular", 
			"vehiculo_placa" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"vehiculo_id", 
			"vehiculo_nombre", 
			"vehiculo_celular", 
			"vehiculo_placa" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
