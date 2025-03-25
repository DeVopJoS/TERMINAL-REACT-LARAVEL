<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Arqueorecaudacioncab extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'arqueorecaudacioncab';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'arqueorecid';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = [
        'arqueocorrelativo',
        'arqueofecha',
        'arqueoturno',
        'punto_recaud_id',
        'arqueonombreoperador',
        'arqueousuario',
        'arqueofecharegistro',
        'arqueoid',
        'arqueoestado',
        'arqueonombresupervisor'
    ];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(arqueorecid AS TEXT) LIKE ?  OR 
				arqueoturno LIKE ?  OR 
				arqueonombreoperador LIKE ?  OR 
				arqueoestado LIKE ? 
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
			"arqueorecid", 
			"arqueocorrelativo", 
			"arqueofecha", 
			"arqueoturno", 
			"punto_recaud_id", 
			"arqueonombreoperador", 
			"arqueousuario", 
			"arqueofecharegistro", 
			"arqueoid", 
			"arqueoestado",
            "arqueonombresupervisor"
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"arqueorecid", 
			"arqueocorrelativo", 
			"arqueofecha", 
			"arqueoturno", 
			"punto_recaud_id", 
			"arqueonombreoperador", 
			"arqueousuario", 
			"arqueofecharegistro", 
			"arqueoid", 
			"arqueoestado",
            "arqueonombresupervisor"
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return self::listFields();
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"arqueorecid", 
			"arqueocorrelativo", 
			"arqueofecha", 
			"arqueoturno", 
			"punto_recaud_id", 
			"arqueonombreoperador", 
			"arqueousuario", 
			"arqueofecharegistro", 
			"arqueoid", 
			"arqueoestado",
            "arqueonombresupervisor"
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return self::listFields();
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;

    public function puntoRecaudacion()
    {
        return $this->belongsTo(TblPuntosRecaudacion::class, 'punto_recaud_id', 'punto_recaud_id');
    }

    public function detalles()
    {
        return $this->hasMany(ArqueorecaudacionDet::class, 'arqueorecid', 'arqueorecid');
    }
}
