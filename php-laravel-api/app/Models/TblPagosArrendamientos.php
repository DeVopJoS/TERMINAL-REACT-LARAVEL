<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblPagosArrendamientos extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_pagos_arrendamientos';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'pago_arrendamiento_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["arrendamiento_id","pago_monto","pago_fecha","pago_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(pago_arrendamiento_id AS TEXT) LIKE ?  OR 
				pago_estado LIKE ? 
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
			"pago_arrendamiento_id", 
			"arrendamiento_id", 
			"pago_monto", 
			"pago_fecha", 
			"pago_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"pago_arrendamiento_id", 
			"arrendamiento_id", 
			"pago_monto", 
			"pago_fecha", 
			"pago_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"pago_arrendamiento_id", 
			"arrendamiento_id", 
			"pago_monto", 
			"pago_fecha", 
			"pago_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"pago_arrendamiento_id", 
			"arrendamiento_id", 
			"pago_monto", 
			"pago_fecha", 
			"pago_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"pago_arrendamiento_id", 
			"arrendamiento_id", 
			"pago_monto", 
			"pago_fecha", 
			"pago_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
