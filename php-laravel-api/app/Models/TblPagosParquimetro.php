<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblPagosParquimetro extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_pagos_parquimetro';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'pago_parquimetro_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["parquimetro_id","pago_monto","pago_fecha"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(pago_parquimetro_id AS TEXT) LIKE ? 
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
			"pago_parquimetro_id", 
			"parquimetro_id", 
			"pago_monto", 
			"pago_fecha" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"pago_parquimetro_id", 
			"parquimetro_id", 
			"pago_monto", 
			"pago_fecha" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"pago_parquimetro_id", 
			"parquimetro_id", 
			"pago_monto", 
			"pago_fecha" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"pago_parquimetro_id", 
			"parquimetro_id", 
			"pago_monto", 
			"pago_fecha" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"pago_parquimetro_id", 
			"parquimetro_id", 
			"pago_monto", 
			"pago_fecha" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
