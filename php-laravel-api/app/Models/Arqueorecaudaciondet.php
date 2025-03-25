<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Arqueorecaudaciondet extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'arqueorecaudaciondet';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'arqueorecdetid';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["arqueorecid","servicio_id","arqueodetcantidad","arqueodettarifabs","arqueodetimportebs","arqueoestado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(arqueorecdetid AS TEXT) LIKE ?  OR 
				arqueoestado LIKE ? 
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
			"arqueorecdetid", 
			"arqueorecid", 
			"servicio_id", 
			"arqueodetcantidad", 
			"arqueodettarifabs", 
			"arqueodetimportebs", 
			"arqueoestado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"arqueorecdetid", 
			"arqueorecid", 
			"servicio_id", 
			"arqueodetcantidad", 
			"arqueodettarifabs", 
			"arqueodetimportebs", 
			"arqueoestado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"arqueorecdetid", 
			"arqueorecid", 
			"servicio_id", 
			"arqueodetcantidad", 
			"arqueodettarifabs", 
			"arqueodetimportebs", 
			"arqueoestado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"arqueorecdetid", 
			"arqueorecid", 
			"servicio_id", 
			"arqueodetcantidad", 
			"arqueodettarifabs", 
			"arqueodetimportebs", 
			"arqueoestado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"arqueorecid", 
			"servicio_id", 
			"arqueodetcantidad", 
			"arqueodettarifabs", 
			"arqueodetimportebs", 
			"arqueoestado", 
			"arqueorecdetid" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
