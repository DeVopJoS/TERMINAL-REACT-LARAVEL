<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class TblArrendamientos extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'tbl_arrendamientos';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'arrendamiento_id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["ambiente_id","num_contrato","operador_nombre","arrendatario_nombre","arrendatario_apellido_paterno","arrendatario_apellido_materno","arrendatario_ci","arrendatario_nombre_comercial","arrendatario_telefono","arrendatario_celular","ambiente_codigo","arrendamiento_fecha_inicio","arrendamiento_fecha_fin","arrendamiento_canon","arrendamiento_funcion","arrendamiento_forma_pago","arrendamiento_estado"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				CAST(arrendamiento_id AS TEXT) LIKE ?  OR 
				num_contrato LIKE ?  OR 
				operador_nombre LIKE ?  OR 
				arrendatario_nombre LIKE ?  OR 
				arrendatario_apellido_paterno LIKE ?  OR 
				arrendatario_apellido_materno LIKE ?  OR 
				arrendatario_ci LIKE ?  OR 
				arrendatario_nombre_comercial LIKE ?  OR 
				arrendatario_telefono LIKE ?  OR 
				arrendatario_celular LIKE ?  OR 
				ambiente_codigo LIKE ?  OR 
				arrendamiento_funcion LIKE ?  OR 
				arrendamiento_forma_pago LIKE ?  OR 
				arrendamiento_estado LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%","%$text%"
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
			"arrendamiento_id", 
			"ambiente_id", 
			"num_contrato", 
			"operador_nombre", 
			"arrendatario_nombre", 
			"arrendatario_apellido_paterno", 
			"arrendatario_apellido_materno", 
			"arrendatario_ci", 
			"arrendatario_nombre_comercial", 
			"arrendatario_telefono", 
			"arrendatario_celular", 
			"ambiente_codigo", 
			"arrendamiento_fecha_inicio", 
			"arrendamiento_fecha_fin", 
			"arrendamiento_canon", 
			"arrendamiento_funcion", 
			"arrendamiento_forma_pago", 
			"arrendamiento_estado" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"arrendamiento_id", 
			"ambiente_id", 
			"num_contrato", 
			"operador_nombre", 
			"arrendatario_nombre", 
			"arrendatario_apellido_paterno", 
			"arrendatario_apellido_materno", 
			"arrendatario_ci", 
			"arrendatario_nombre_comercial", 
			"arrendatario_telefono", 
			"arrendatario_celular", 
			"ambiente_codigo", 
			"arrendamiento_fecha_inicio", 
			"arrendamiento_fecha_fin", 
			"arrendamiento_canon", 
			"arrendamiento_funcion", 
			"arrendamiento_forma_pago", 
			"arrendamiento_estado" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"arrendamiento_id", 
			"ambiente_id", 
			"num_contrato", 
			"operador_nombre", 
			"arrendatario_nombre", 
			"arrendatario_apellido_paterno", 
			"arrendatario_apellido_materno", 
			"arrendatario_ci", 
			"arrendatario_nombre_comercial", 
			"arrendatario_telefono", 
			"arrendatario_celular", 
			"ambiente_codigo", 
			"arrendamiento_fecha_inicio", 
			"arrendamiento_fecha_fin", 
			"arrendamiento_canon", 
			"arrendamiento_funcion", 
			"arrendamiento_forma_pago", 
			"arrendamiento_estado" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"arrendamiento_id", 
			"ambiente_id", 
			"num_contrato", 
			"operador_nombre", 
			"arrendatario_nombre", 
			"arrendatario_apellido_paterno", 
			"arrendatario_apellido_materno", 
			"arrendatario_ci", 
			"arrendatario_nombre_comercial", 
			"arrendatario_telefono", 
			"arrendatario_celular", 
			"ambiente_codigo", 
			"arrendamiento_fecha_inicio", 
			"arrendamiento_fecha_fin", 
			"arrendamiento_canon", 
			"arrendamiento_funcion", 
			"arrendamiento_forma_pago", 
			"arrendamiento_estado" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"arrendamiento_id", 
			"ambiente_id", 
			"num_contrato", 
			"operador_nombre", 
			"arrendatario_nombre", 
			"arrendatario_apellido_paterno", 
			"arrendatario_apellido_materno", 
			"arrendatario_ci", 
			"arrendatario_nombre_comercial", 
			"arrendatario_telefono", 
			"arrendatario_celular", 
			"ambiente_codigo", 
			"arrendamiento_fecha_inicio", 
			"arrendamiento_fecha_fin", 
			"arrendamiento_canon", 
			"arrendamiento_funcion", 
			"arrendamiento_forma_pago", 
			"arrendamiento_estado" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
