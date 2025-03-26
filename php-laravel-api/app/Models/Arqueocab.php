<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Arqueocab extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'arqueocab';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'arqueoid';
	public $incrementing = false;
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = [
        'arqueoid',
        'arqueonumero',
        'arqueofecha',
        'arqueoturno',
        'arqueohorainicio',
        'arqueohorafin',
        'arqueosupervisor',
        'arqueorealizadopor',
        'arqueorevisadopor',
        'arqueorecaudaciontotal',
        'arqueodiferencia',
        'arqueoobservacion',
        'arqueoestado',
        'arqueofecharegistro',
        'arqueousuario'
    ];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(arqueoid AS TEXT) LIKE ?  OR 
				arqueoturno LIKE ?  OR 
				arqueoobservacion LIKE ?  OR 
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
			"arqueoid", 
			"arqueonumero", 
			"arqueofecha", 
			"arqueoturno", 
			"arqueohorainicio", 
			"arqueohorafin", 
			"arqueosupervisor", 
			"arqueorealizadopor", 
			"arqueorevisadopor", 
			"arqueorecaudaciontotal", 
			"arqueodiferencia", 
			"arqueoobservacion", 
			"arqueoestado", 
			"arqueofecharegistro", 
			"arqueousuario" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"arqueoid", 
			"arqueonumero", 
			"arqueofecha", 
			"arqueoturno", 
			"arqueohorainicio", 
			"arqueohorafin", 
			"arqueosupervisor", 
			"arqueorealizadopor", 
			"arqueorevisadopor", 
			"arqueorecaudaciontotal", 
			"arqueodiferencia", 
			"arqueoobservacion", 
			"arqueoestado", 
			"arqueofecharegistro", 
			"arqueousuario" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"arqueoid", 
			"arqueonumero", 
			"arqueofecha", 
			"arqueoturno", 
			"arqueohorainicio", 
			"arqueohorafin", 
			"arqueosupervisor", 
			"arqueorealizadopor", 
			"arqueorevisadopor", 
			"arqueorecaudaciontotal", 
			"arqueodiferencia", 
			"arqueoobservacion", 
			"arqueoestado", 
			"arqueofecharegistro", 
			"arqueousuario" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"arqueoid", 
			"arqueonumero", 
			"arqueofecha", 
			"arqueoturno", 
			"arqueohorainicio", 
			"arqueohorafin", 
			"arqueosupervisor", 
			"arqueorealizadopor", 
			"arqueorevisadopor", 
			"arqueorecaudaciontotal", 
			"arqueodiferencia", 
			"arqueoobservacion", 
			"arqueoestado", 
			"arqueofecharegistro", 
			"arqueousuario" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"arqueoid", 
			"arqueonumero", 
			"arqueofecha", 
			"arqueoturno", 
			"arqueohorainicio", 
			"arqueohorafin", 
			"arqueosupervisor", 
			"arqueorealizadopor", 
			"arqueorevisadopor", 
			"arqueorecaudaciontotal", 
			"arqueodiferencia", 
			"arqueoobservacion", 
			"arqueoestado", 
			"arqueofecharegistro", 
			"arqueousuario" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;

    /**
     * Get the cortes associated with this arqueo.
     */
    public function cortes()
    {
        return $this->hasOne(Arqueodetcortes::class, 'arqueoid', 'arqueoid');
    }

    /**
     * Get the recaudaciones associated with this arqueo.
     */
    public function recaudaciones()
    {
        return $this->hasMany(ArqueorecaudacionCab::class, 'arqueoid', 'arqueoid');
    }

    /**
     * Get a formatted display value for arqueorevisadopor
     * @return string
     */
    public function getArqueorevisadoporDisplayAttribute()
    {
        return $this->arqueorevisadopor ? 'Usuario #' . $this->arqueorevisadopor : 'No revisado';
    }
}
