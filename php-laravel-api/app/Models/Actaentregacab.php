<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Actaentregacab extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'actaentregacab';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'ae_actaid';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["ae_correlativo","punto_recaud_id","ae_fecha","ae_grupo","ae_operador1erturno","ae_operador2doturno","ae_cambiobs","ae_cajachicabs","ae_llaves","ae_fechero","ae_tampo","ae_candados","ae_observacion","ae_recaudaciontotalbs","ae_usuario","ae_usuarioarqueo","ae_fecharegistro","ae_fechaarqueo","ae_estado","arqueoid"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(ae_actaid AS TEXT) LIKE ?  OR 
				ae_grupo LIKE ?  OR 
				ae_operador1erturno LIKE ?  OR 
				ae_operador2doturno LIKE ?  OR 
				ae_observacion LIKE ?  OR 
				ae_estado LIKE ? 
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
			"ae_actaid", 
			"ae_correlativo", 
			"punto_recaud_id", 
			"ae_fecha", 
			"ae_grupo", 
			"ae_operador1erturno", 
			"ae_operador2doturno", 
			"ae_cambiobs", 
			"ae_cajachicabs", 
			"ae_llaves", 
			"ae_fechero", 
			"ae_tampo", 
			"ae_candados", 
			"ae_observacion", 
			"ae_recaudaciontotalbs", 
			"ae_usuario", 
			"ae_usuarioarqueo", 
			"ae_fecharegistro", 
			"ae_fechaarqueo", 
			"ae_estado", 
			"arqueoid" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"ae_actaid", 
			"ae_correlativo", 
			"punto_recaud_id", 
			"ae_fecha", 
			"ae_grupo", 
			"ae_operador1erturno", 
			"ae_operador2doturno", 
			"ae_cambiobs", 
			"ae_cajachicabs", 
			"ae_llaves", 
			"ae_fechero", 
			"ae_tampo", 
			"ae_candados", 
			"ae_observacion", 
			"ae_recaudaciontotalbs", 
			"ae_usuario", 
			"ae_usuarioarqueo", 
			"ae_fecharegistro", 
			"ae_fechaarqueo", 
			"ae_estado", 
			"arqueoid" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"ae_actaid", 
			"ae_correlativo", 
			"punto_recaud_id", 
			"ae_fecha", 
			"ae_grupo", 
			"ae_operador1erturno", 
			"ae_operador2doturno", 
			"ae_cambiobs", 
			"ae_cajachicabs", 
			"ae_llaves", 
			"ae_fechero", 
			"ae_tampo", 
			"ae_candados", 
			"ae_observacion", 
			"ae_recaudaciontotalbs", 
			"ae_usuario", 
			"ae_usuarioarqueo", 
			"ae_fecharegistro", 
			"ae_fechaarqueo", 
			"ae_estado", 
			"arqueoid" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"ae_actaid", 
			"ae_correlativo", 
			"punto_recaud_id", 
			"ae_fecha", 
			"ae_grupo", 
			"ae_operador1erturno", 
			"ae_operador2doturno", 
			"ae_cambiobs", 
			"ae_cajachicabs", 
			"ae_llaves", 
			"ae_fechero", 
			"ae_tampo", 
			"ae_candados", 
			"ae_observacion", 
			"ae_recaudaciontotalbs", 
			"ae_usuario", 
			"ae_usuarioarqueo", 
			"ae_fecharegistro", 
			"ae_fechaarqueo", 
			"ae_estado", 
			"arqueoid" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"ae_actaid", 
			"ae_correlativo", 
			"punto_recaud_id", 
			"ae_fecha", 
			"ae_grupo", 
			"ae_operador1erturno", 
			"ae_operador2doturno", 
			"ae_cambiobs", 
			"ae_cajachicabs", 
			"ae_llaves", 
			"ae_fechero", 
			"ae_tampo", 
			"ae_candados", 
			"ae_observacion", 
			"ae_recaudaciontotalbs", 
			"ae_usuario", 
			"ae_usuarioarqueo", 
			"ae_fecharegistro", 
			"ae_fechaarqueo", 
			"ae_estado", 
			"arqueoid" 
		];
	}
	

	public static function obtenerDatosConPunto($actaId)
    {
        return self::from('actaentregacab as acab')
            ->select(
                'acab.ae_fecha',
                'acab.ae_grupo',
                'acab.ae_cambiobs',
                'acab.ae_cajachicabs',
                'acab.ae_llaves',
                'acab.ae_fechero',
                'acab.ae_tampo',
                'acab.ae_candados',
                'tpr.puntorecaud_nombre'
            )
            ->join('tbl_puntos_recaudacion as tpr', 'acab.punto_recaud_id', '=', 'tpr.punto_recaud_id')
            ->where('acab.ae_actaid', $actaId)
            ->get();
    }

	public function puntoRecaudacion()
	{
		return $this->belongsTo(TblPuntosRecaudacion::class, 'punto_recaud_id', 'punto_recaud_id');
	}


	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
