<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Arqueodetcortes extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'arqueodetcortes';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'arqueodetcorteid';
	public $incrementing = false;
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["arqueodetcorteid","arqueoid","arqueocorte200_00","arqueocorte100_00","arqueocorte050_00","arqueocorte020_00","arqueocorte010_00","arqueocorte005_00","arqueocorte002_00","arqueocorte001_00","arqueocorte000_50","arqueocorte000_20","arqueocorte000_10","arqueoestado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(arqueodetcorteid AS TEXT) LIKE ?  OR 
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
			"arqueodetcorteid", 
			"arqueoid", 
			"arqueocorte200_00", 
			"arqueocorte100_00", 
			"arqueocorte050_00", 
			"arqueocorte020_00", 
			"arqueocorte010_00", 
			"arqueocorte005_00", 
			"arqueocorte002_00", 
			"arqueocorte001_00", 
			"arqueocorte000_50", 
			"arqueocorte000_20", 
			"arqueocorte000_10", 
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
			"arqueodetcorteid", 
			"arqueoid", 
			"arqueocorte200_00", 
			"arqueocorte100_00", 
			"arqueocorte050_00", 
			"arqueocorte020_00", 
			"arqueocorte010_00", 
			"arqueocorte005_00", 
			"arqueocorte002_00", 
			"arqueocorte001_00", 
			"arqueocorte000_50", 
			"arqueocorte000_20", 
			"arqueocorte000_10", 
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
			"arqueodetcorteid", 
			"arqueoid", 
			"arqueocorte200_00", 
			"arqueocorte100_00", 
			"arqueocorte050_00", 
			"arqueocorte020_00", 
			"arqueocorte010_00", 
			"arqueocorte005_00", 
			"arqueocorte002_00", 
			"arqueocorte001_00", 
			"arqueocorte000_50", 
			"arqueocorte000_20", 
			"arqueocorte000_10", 
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
			"arqueodetcorteid", 
			"arqueoid", 
			"arqueocorte200_00", 
			"arqueocorte100_00", 
			"arqueocorte050_00", 
			"arqueocorte020_00", 
			"arqueocorte010_00", 
			"arqueocorte005_00", 
			"arqueocorte002_00", 
			"arqueocorte001_00", 
			"arqueocorte000_50", 
			"arqueocorte000_20", 
			"arqueocorte000_10", 
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
			"arqueodetcorteid", 
			"arqueoid", 
			"arqueocorte200_00", 
			"arqueocorte100_00", 
			"arqueocorte050_00", 
			"arqueocorte020_00", 
			"arqueocorte010_00", 
			"arqueocorte005_00", 
			"arqueocorte002_00", 
			"arqueocorte001_00", 
			"arqueocorte000_50", 
			"arqueocorte000_20", 
			"arqueocorte000_10", 
			"arqueoestado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
