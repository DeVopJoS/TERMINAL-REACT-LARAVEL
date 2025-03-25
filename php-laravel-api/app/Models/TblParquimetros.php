<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblParquimetros extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_parquimetros';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'parquimetro_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["vehiculo_id","punto_servicio_id","parquimetro_hora_inicio","parquimetro_hora_fin","parquimetro_monto"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(parquimetro_id AS TEXT) LIKE ? 
		)';
		$search_params = [
			"%$text%"
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
			"parquimetro_id", 
			"vehiculo_id", 
			"punto_servicio_id", 
			"parquimetro_hora_inicio", 
			"parquimetro_hora_fin", 
			"parquimetro_monto" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"parquimetro_id", 
			"vehiculo_id", 
			"punto_servicio_id", 
			"parquimetro_hora_inicio", 
			"parquimetro_hora_fin", 
			"parquimetro_monto" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"parquimetro_id", 
			"vehiculo_id", 
			"punto_servicio_id", 
			"parquimetro_hora_inicio", 
			"parquimetro_hora_fin", 
			"parquimetro_monto" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"parquimetro_id", 
			"vehiculo_id", 
			"punto_servicio_id", 
			"parquimetro_hora_inicio", 
			"parquimetro_hora_fin", 
			"parquimetro_monto" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"parquimetro_id", 
			"vehiculo_id", 
			"punto_servicio_id", 
			"parquimetro_hora_inicio", 
			"parquimetro_hora_fin", 
			"parquimetro_monto" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
