<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
/**
 * Components Data Contoller
 * Use for getting values from the database for page components
 * Support raw query builder
 * @category Controller
 */
class Components_dataController extends Controller{
	public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['users_username_exist','users_email_exist']]);
    }

	// MODULES: tbl_puntos_recaudacion, tbl_servicios, tbl_arqueorecaudacioncab
	/**
     * punto_recaud_id_option_list Model Action
     * @return array
     */
	function punto_recaud_id_option_list(Request $request){
		$sqltext = "SELECT punto_recaud_id AS value,puntorecaud_nombre AS label FROM tbl_puntos_recaudacion";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * arqueorecid_option_list Model Action
     * @return array
     */
	function arqueorecid_option_list(Request $request){
		$sqltext = "SELECT arqueorecid as value, arqueorecid as label FROM arqueorecaudacioncab";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * servicio_id_option_list Model Action
     * @return array
     */
	function servicio_id_option_list(Request $request){
		$sqltext = "SELECT servicio_id AS value,servicio_descripcion AS label FROM tbl_servicios";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * check if username value already exist in Users
	 * @param string $value
     * @return bool
     */
	function users_username_exist(Request $request, $value){
		$exist = DB::table('users')->where('username', $value)->value('username');   
		if($exist){
			return "true";
		}
		return "false";
	}
	/**
     * check if email value already exist in Users
	 * @param string $value
     * @return bool
     */
	function users_email_exist(Request $request, $value){
		$exist = DB::table('users')->where('email', $value)->value('email');   
		if($exist){
			return "true";
		}
		return "false";
	}
	/**
     * role_id_option_list Model Action
     * @return array
     */
	function role_id_option_list(Request $request){
		$sqltext = "SELECT id as value, role_name as label FROM roles";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}

}

// MODULES: tbl_edificio_ambiente, tbl_edificio_nivel, tbl_edificio_seccion, tbl_arrendamientos
/**
     * ambiente_id_option_list Model Action
     * @return array
     */
	function ambiente_id_option_list(Request $request){
		$sqltext = "SELECT ambiente_id AS value,ambiente_nombre AS label,ambiente_codigo_interno AS caption FROM tbl_edificio_ambiente";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
		/**
     * edificio_id_option_list Model Action
     * @return array
     */
	function edificio_id_option_list(Request $request){
		$sqltext = "SELECT edificio_id AS value, edificio_nombre AS label FROM tbl_edificio";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * nivel_id_option_list Model Action
     * @return array
     */
	function nivel_id_option_list(Request $request){
		$sqltext = "SELECT nivel_id AS value, nivel_nombre AS label FROM tbl_edificio_nivel";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
	/**
     * seccion_id_option_list Model Action
     * @return array
     */
	function seccion_id_option_list(Request $request){
		$sqltext = "SELECT seccion_id AS value, seccion_nombre AS label FROM tbl_edificio_seccion";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}
		/**
     * arrendamiento_id_option_list Model Action
     * @return array
     */
	function arrendamiento_id_option_list(Request $request){
		$sqltext = "SELECT arrendamiento_id AS value,arrendatario_nombre AS label,num_contrato AS caption FROM tbl_arrendamientos";
		$query_params = [];
		$arr = DB::select($sqltext, $query_params);
		return $arr;
	}