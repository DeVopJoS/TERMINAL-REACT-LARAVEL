<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblArrendamientosDocumentos extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_arrendamientos_documentos';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'documento_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["arrendamiento_id","documento_tipo","documento_nombre","documento_url","documento_descripcion","fecha_subida","documento_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(documento_id AS TEXT) LIKE ?  OR 
				documento_tipo LIKE ?  OR 
				documento_nombre LIKE ?  OR 
				documento_url LIKE ?  OR 
				documento_descripcion LIKE ?  OR 
				documento_estado LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%","%$text%"
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
			"documento_id", 
			"arrendamiento_id", 
			"documento_tipo", 
			"documento_nombre", 
			"documento_url", 
			"documento_descripcion", 
			"fecha_subida", 
			"documento_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"documento_id", 
			"arrendamiento_id", 
			"documento_tipo", 
			"documento_nombre", 
			"documento_url", 
			"documento_descripcion", 
			"fecha_subida", 
			"documento_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"documento_id", 
			"arrendamiento_id", 
			"documento_tipo", 
			"documento_nombre", 
			"documento_url", 
			"documento_descripcion", 
			"fecha_subida", 
			"documento_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"documento_id", 
			"arrendamiento_id", 
			"documento_tipo", 
			"documento_nombre", 
			"documento_url", 
			"documento_descripcion", 
			"fecha_subida", 
			"documento_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"documento_id", 
			"arrendamiento_id", 
			"documento_tipo", 
			"documento_nombre", 
			"documento_url", 
			"documento_descripcion", 
			"fecha_subida", 
			"documento_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
