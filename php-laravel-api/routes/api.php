<?php

use App\Http\Controllers\ActaentregacabController;
use App\Http\Controllers\TblServiciosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// api routes that need auth

Route::middleware(['auth:api'])->group(function () {


/* routes for Actaentregacab Controller  */	
	Route::get('actaentregacab/', 'ActaentregacabController@index');
	Route::get('actaentregacab/index', 'ActaentregacabController@index');
	Route::get('actaentregacab/index/{filter?}/{filtervalue?}', 'ActaentregacabController@index');	
	Route::get('actaentregacab/view/{rec_id}', 'ActaentregacabController@view');	
	Route::post('actaentregacab/add', 'ActaentregacabController@add');	
	Route::any('actaentregacab/edit/{rec_id}', 'ActaentregacabController@edit');	
	Route::any('actaentregacab/delete/{rec_id}', 'ActaentregacabController@delete');

/* routes for Actaentregadet Controller  */	
	Route::get('actaentregadet/', 'ActaentregadetController@index');
	Route::get('actaentregadet/index', 'ActaentregadetController@index');
	Route::get('actaentregadet/index/{filter?}/{filtervalue?}', 'ActaentregadetController@index');	
	Route::get('actaentregadet/view/{rec_id}', 'ActaentregadetController@view');	
	Route::post('actaentregadet/add', 'ActaentregadetController@add');	
	Route::any('actaentregadet/edit/{rec_id}', 'ActaentregadetController@edit');	
	Route::any('actaentregadet/delete/{rec_id}', 'ActaentregadetController@delete');

/* routes for Arqueocab Controller  */	
	Route::get('arqueocab/', 'ArqueocabController@index');
	Route::get('arqueocab/index', 'ArqueocabController@index');
	Route::get('arqueocab/index/{filter?}/{filtervalue?}', 'ArqueocabController@index');	
	Route::get('arqueocab/view/{rec_id}', 'ArqueocabController@view');	
	Route::post('arqueocab/add', 'ArqueocabController@add');	
	Route::any('arqueocab/edit/{rec_id}', 'ArqueocabController@edit');	
	Route::any('arqueocab/delete/{rec_id}', 'ArqueocabController@delete');

/* routes for Arqueodetcortes Controller  */	
	Route::get('arqueodetcortes/', 'ArqueodetcortesController@index');
	Route::get('arqueodetcortes/index', 'ArqueodetcortesController@index');
	Route::get('arqueodetcortes/index/{filter?}/{filtervalue?}', 'ArqueodetcortesController@index');	
	Route::get('arqueodetcortes/view/{rec_id}', 'ArqueodetcortesController@view');	
	Route::post('arqueodetcortes/add', 'ArqueodetcortesController@add');	
	Route::any('arqueodetcortes/edit/{rec_id}', 'ArqueodetcortesController@edit');	
	Route::any('arqueodetcortes/delete/{rec_id}', 'ArqueodetcortesController@delete');

/* routes for Arqueorecaudacioncab Controller  */	
	Route::get('arqueorecaudacioncab/', 'ArqueorecaudacioncabController@index');
	Route::get('arqueorecaudacioncab/index', 'ArqueorecaudacioncabController@index');
	Route::get('arqueorecaudacioncab/index/{filter?}/{filtervalue?}', 'ArqueorecaudacioncabController@index');	
	Route::get('arqueorecaudacioncab/view/{rec_id}', 'ArqueorecaudacioncabController@view');	
	Route::post('arqueorecaudacioncab/add', 'ArqueorecaudacioncabController@add');	
	Route::any('arqueorecaudacioncab/edit/{rec_id}', 'ArqueorecaudacioncabController@edit');	
	Route::any('arqueorecaudacioncab/delete/{rec_id}', 'ArqueorecaudacioncabController@delete');

/* routes for Arqueorecaudaciondet Controller  */	
	Route::get('arqueorecaudaciondet/', 'ArqueorecaudaciondetController@index');
	Route::get('arqueorecaudaciondet/index', 'ArqueorecaudaciondetController@index');
	Route::get('arqueorecaudaciondet/index/{filter?}/{filtervalue?}', 'ArqueorecaudaciondetController@index');	
	Route::get('arqueorecaudaciondet/view/{rec_id}', 'ArqueorecaudaciondetController@view');	
	Route::post('arqueorecaudaciondet/add', 'ArqueorecaudaciondetController@add');	
	Route::any('arqueorecaudaciondet/edit/{rec_id}', 'ArqueorecaudaciondetController@edit');	
	Route::any('arqueorecaudaciondet/delete/{rec_id}', 'ArqueorecaudaciondetController@delete');

/* routes for Roles Controller  */	
	Route::get('roles/', 'RolesController@index');
	Route::get('roles/index', 'RolesController@index');
	Route::get('roles/index/{filter?}/{filtervalue?}', 'RolesController@index');	
	Route::get('roles/view/{rec_id}', 'RolesController@view');	
	Route::post('roles/add', 'RolesController@add');	
	Route::any('roles/edit/{rec_id}', 'RolesController@edit');	
	Route::any('roles/delete/{rec_id}', 'RolesController@delete');

/* routes for TblArrendamientos Controller  */	
	Route::get('tblarrendamientos/', 'TblArrendamientosController@index');
	Route::get('tblarrendamientos/index', 'TblArrendamientosController@index');
	Route::get('tblarrendamientos/index/{filter?}/{filtervalue?}', 'TblArrendamientosController@index');	
	Route::get('tblarrendamientos/view/{rec_id}', 'TblArrendamientosController@view');	
	Route::post('tblarrendamientos/add', 'TblArrendamientosController@add');	
	Route::any('tblarrendamientos/edit/{rec_id}', 'TblArrendamientosController@edit');	
	Route::any('tblarrendamientos/delete/{rec_id}', 'TblArrendamientosController@delete');

/* routes for TblArrendamientosDocumentos Controller  */	
	Route::get('tblarrendamientosdocumentos/', 'TblArrendamientosDocumentosController@index');
	Route::get('tblarrendamientosdocumentos/index', 'TblArrendamientosDocumentosController@index');
	Route::get('tblarrendamientosdocumentos/index/{filter?}/{filtervalue?}', 'TblArrendamientosDocumentosController@index');	
	Route::get('tblarrendamientosdocumentos/view/{rec_id}', 'TblArrendamientosDocumentosController@view');	
	Route::post('tblarrendamientosdocumentos/add', 'TblArrendamientosDocumentosController@add');	
	Route::any('tblarrendamientosdocumentos/edit/{rec_id}', 'TblArrendamientosDocumentosController@edit');	
	Route::any('tblarrendamientosdocumentos/delete/{rec_id}', 'TblArrendamientosDocumentosController@delete');

/* routes for TblEdificio Controller  */	
	Route::get('tbledificio/', 'TblEdificioController@index');
	Route::get('tbledificio/index', 'TblEdificioController@index');
	Route::get('tbledificio/index/{filter?}/{filtervalue?}', 'TblEdificioController@index');	
	Route::get('tbledificio/view/{rec_id}', 'TblEdificioController@view');	
	Route::post('tbledificio/add', 'TblEdificioController@add');	
	Route::any('tbledificio/edit/{rec_id}', 'TblEdificioController@edit');	
	Route::any('tbledificio/delete/{rec_id}', 'TblEdificioController@delete');

/* routes for TblEdificioAmbiente Controller  */	
	Route::get('tbledificioambiente/', 'TblEdificioAmbienteController@index');
	Route::get('tbledificioambiente/index', 'TblEdificioAmbienteController@index');
	Route::get('tbledificioambiente/index/{filter?}/{filtervalue?}', 'TblEdificioAmbienteController@index');	
	Route::get('tbledificioambiente/view/{rec_id}', 'TblEdificioAmbienteController@view');	
	Route::post('tbledificioambiente/add', 'TblEdificioAmbienteController@add');	
	Route::any('tbledificioambiente/edit/{rec_id}', 'TblEdificioAmbienteController@edit');	
	Route::any('tbledificioambiente/delete/{rec_id}', 'TblEdificioAmbienteController@delete');

/* routes for TblEdificioNivel Controller  */	
	Route::get('tbledificionivel/', 'TblEdificioNivelController@index');
	Route::get('tbledificionivel/index', 'TblEdificioNivelController@index');
	Route::get('tbledificionivel/index/{filter?}/{filtervalue?}', 'TblEdificioNivelController@index');	
	Route::get('tbledificionivel/view/{rec_id}', 'TblEdificioNivelController@view');	
	Route::post('tbledificionivel/add', 'TblEdificioNivelController@add');	
	Route::any('tbledificionivel/edit/{rec_id}', 'TblEdificioNivelController@edit');	
	Route::any('tbledificionivel/delete/{rec_id}', 'TblEdificioNivelController@delete');

/* routes for TblEdificioSeccion Controller  */	
	Route::get('tbledificioseccion/', 'TblEdificioSeccionController@index');
	Route::get('tbledificioseccion/index', 'TblEdificioSeccionController@index');
	Route::get('tbledificioseccion/index/{filter?}/{filtervalue?}', 'TblEdificioSeccionController@index');	
	Route::get('tbledificioseccion/view/{rec_id}', 'TblEdificioSeccionController@view');	
	Route::post('tbledificioseccion/add', 'TblEdificioSeccionController@add');	
	Route::any('tbledificioseccion/edit/{rec_id}', 'TblEdificioSeccionController@edit');	
	Route::any('tbledificioseccion/delete/{rec_id}', 'TblEdificioSeccionController@delete');

/* routes for TblFacturaDetalle Controller  */	
	Route::get('tblfacturadetalle/', 'TblFacturaDetalleController@index');
	Route::get('tblfacturadetalle/index', 'TblFacturaDetalleController@index');
	Route::get('tblfacturadetalle/index/{filter?}/{filtervalue?}', 'TblFacturaDetalleController@index');	
	Route::get('tblfacturadetalle/view/{rec_id}', 'TblFacturaDetalleController@view');	
	Route::post('tblfacturadetalle/add', 'TblFacturaDetalleController@add');	
	Route::any('tblfacturadetalle/edit/{rec_id}', 'TblFacturaDetalleController@edit');	
	Route::any('tblfacturadetalle/delete/{rec_id}', 'TblFacturaDetalleController@delete');

/* routes for TblFacturas Controller  */	
	Route::get('tblfacturas/', 'TblFacturasController@index');
	Route::get('tblfacturas/index', 'TblFacturasController@index');
	Route::get('tblfacturas/index/{filter?}/{filtervalue?}', 'TblFacturasController@index');	
	Route::get('tblfacturas/view/{rec_id}', 'TblFacturasController@view');	
	Route::post('tblfacturas/add', 'TblFacturasController@add');	
	Route::any('tblfacturas/edit/{rec_id}', 'TblFacturasController@edit');	
	Route::any('tblfacturas/delete/{rec_id}', 'TblFacturasController@delete');

/* routes for TblOperadores Controller  */	
	Route::get('tbloperadores/', 'TblOperadoresController@index');
	Route::get('tbloperadores/index', 'TblOperadoresController@index');
	Route::get('tbloperadores/index/{filter?}/{filtervalue?}', 'TblOperadoresController@index');	
	Route::get('tbloperadores/view/{rec_id}', 'TblOperadoresController@view');	
	Route::post('tbloperadores/add', 'TblOperadoresController@add');	
	Route::any('tbloperadores/edit/{rec_id}', 'TblOperadoresController@edit');	
	Route::any('tbloperadores/delete/{rec_id}', 'TblOperadoresController@delete');

/* routes for TblPagosArrendamientos Controller  */	
	Route::get('tblpagosarrendamientos/', 'TblPagosArrendamientosController@index');
	Route::get('tblpagosarrendamientos/index', 'TblPagosArrendamientosController@index');
	Route::get('tblpagosarrendamientos/index/{filter?}/{filtervalue?}', 'TblPagosArrendamientosController@index');	
	Route::get('tblpagosarrendamientos/view/{rec_id}', 'TblPagosArrendamientosController@view');	
	Route::post('tblpagosarrendamientos/add', 'TblPagosArrendamientosController@add');	
	Route::any('tblpagosarrendamientos/edit/{rec_id}', 'TblPagosArrendamientosController@edit');	
	Route::any('tblpagosarrendamientos/delete/{rec_id}', 'TblPagosArrendamientosController@delete');

/* routes for TblPagosParquimetro Controller  */	
	Route::get('tblpagosparquimetro/', 'TblPagosParquimetroController@index');
	Route::get('tblpagosparquimetro/index', 'TblPagosParquimetroController@index');
	Route::get('tblpagosparquimetro/index/{filter?}/{filtervalue?}', 'TblPagosParquimetroController@index');	
	Route::get('tblpagosparquimetro/view/{rec_id}', 'TblPagosParquimetroController@view');	
	Route::post('tblpagosparquimetro/add', 'TblPagosParquimetroController@add');	
	Route::any('tblpagosparquimetro/edit/{rec_id}', 'TblPagosParquimetroController@edit');	
	Route::any('tblpagosparquimetro/delete/{rec_id}', 'TblPagosParquimetroController@delete');

/* routes for TblParquimetros Controller  */	
	Route::get('tblparquimetros/', 'TblParquimetrosController@index');
	Route::get('tblparquimetros/index', 'TblParquimetrosController@index');
	Route::get('tblparquimetros/index/{filter?}/{filtervalue?}', 'TblParquimetrosController@index');	
	Route::get('tblparquimetros/view/{rec_id}', 'TblParquimetrosController@view');	
	Route::post('tblparquimetros/add', 'TblParquimetrosController@add');	
	Route::any('tblparquimetros/edit/{rec_id}', 'TblParquimetrosController@edit');	
	Route::any('tblparquimetros/delete/{rec_id}', 'TblParquimetrosController@delete');

/* routes for TblProrrogaSolicitudes Controller  */	
	Route::get('tblprorrogasolicitudes/', 'TblProrrogaSolicitudesController@index');
	Route::get('tblprorrogasolicitudes/index', 'TblProrrogaSolicitudesController@index');
	Route::get('tblprorrogasolicitudes/index/{filter?}/{filtervalue?}', 'TblProrrogaSolicitudesController@index');	
	Route::get('tblprorrogasolicitudes/view/{rec_id}', 'TblProrrogaSolicitudesController@view');	
	Route::post('tblprorrogasolicitudes/add', 'TblProrrogaSolicitudesController@add');	
	Route::any('tblprorrogasolicitudes/edit/{rec_id}', 'TblProrrogaSolicitudesController@edit');	
	Route::any('tblprorrogasolicitudes/delete/{rec_id}', 'TblProrrogaSolicitudesController@delete');

/* routes for TblPuntosRecaudacion Controller  */	
	Route::get('tblpuntosrecaudacion/', 'TblPuntosRecaudacionController@index');
	Route::get('tblpuntosrecaudacion/index', 'TblPuntosRecaudacionController@index');
	//Route::get('tblpuntosrecaudacion/index/{filter?}/{filtervalue?}', 'TblPuntosRecaudacionController@index');	
	Route::get('tblpuntosrecaudacion/view/{rec_id}', 'TblPuntosRecaudacionController@view');	
	Route::post('tblpuntosrecaudacion/add', 'TblPuntosRecaudacionController@add');	
	Route::any('tblpuntosrecaudacion/edit/{rec_id}', 'TblPuntosRecaudacionController@edit');	
	Route::any('tblpuntosrecaudacion/delete/{rec_id}', 'TblPuntosRecaudacionController@delete');

/* routes for TblServicios Controller  */	
	Route::get('tblservicios/', 'TblServiciosController@index');
	Route::get('tblservicios/index', 'TblServiciosController@index');
	Route::get('tblservicios/index/{filter?}/{filtervalue?}', 'TblServiciosController@index');	
	Route::get('tblservicios/view/{rec_id}', 'TblServiciosController@view');	
	Route::post('tblservicios/add', 'TblServiciosController@add');	
	Route::any('tblservicios/edit/{rec_id}', 'TblServiciosController@edit');	
	Route::any('tblservicios/delete/{rec_id}', 'TblServiciosController@delete');

/* routes for TblVehiculos Controller  */	
	Route::get('tblvehiculos/', 'TblVehiculosController@index');
	Route::get('tblvehiculos/index', 'TblVehiculosController@index');
	Route::get('tblvehiculos/index/{filter?}/{filtervalue?}', 'TblVehiculosController@index');	
	Route::get('tblvehiculos/view/{rec_id}', 'TblVehiculosController@view');	
	Route::post('tblvehiculos/add', 'TblVehiculosController@add');	
	Route::any('tblvehiculos/edit/{rec_id}', 'TblVehiculosController@edit');	
	Route::any('tblvehiculos/delete/{rec_id}', 'TblVehiculosController@delete');

/* routes for Users Controller  */	
	Route::get('users/', 'UsersController@index');
	Route::get('users/index', 'UsersController@index');
	Route::get('users/index/{filter?}/{filtervalue?}', 'UsersController@index');	
	Route::get('users/view/{rec_id}', 'UsersController@view');	
	Route::any('account/edit', 'AccountController@edit');	
	Route::get('account', 'AccountController@index');	
	Route::post('account/changepassword', 'AccountController@changepassword');	
	Route::get('account/currentuserdata', 'AccountController@currentuserdata');	
	Route::post('users/add', 'UsersController@add');	
	Route::any('users/edit/{rec_id}', 'UsersController@edit');	
	Route::any('users/delete/{rec_id}', 'UsersController@delete');

/* routes for ArqueoRecaudacion Controller */
	Route::get('arqueo-recaudacion', 'ArqueoRecaudacionController@index');
	Route::post('arqueo-recaudacion', 'ArqueoRecaudacionController@store');
	Route::get('arqueo-recaudacion/{id}', 'ArqueoRecaudacionController@view');
	Route::put('arqueo-recaudacion/{id}', 'ArqueoRecaudacionController@update');
	Route::get('arqueo-recaudacion-puntos', 'ArqueoRecaudacionController@getPuntosRecaudacion');
	Route::get('arqueo-recaudacion-servicios', 'ArqueoRecaudacionController@getServicios');
	Route::get('arqueo-recaudacion-correlativo', 'ArqueoRecaudacionController@getNextCorrelativo');
	Route::post('arqueo-recaudacion-final', 'ArqueoRecaudacionController@generarArqueoFinal');
	Route::get('arqueo-recaudacion-resumen', 'ArqueoRecaudacionController@obtenerResumenPorServicios');
	Route::get('arqueo-recaudacion-numero', 'ArqueoRecaudacionController@getNextNumeroArqueo');
});

Route::get('home', 'HomeController@index');
	
	Route::post('auth/register', 'AuthController@register');	
	Route::post('auth/login', 'AuthController@login');
	Route::get('login', 'AuthController@login')->name('login');
		
	Route::post('auth/forgotpassword', 'AuthController@forgotpassword')->name('password.reset');	
	Route::post('auth/resetpassword', 'AuthController@resetpassword');
	
	Route::get('components_data/punto_recaud_id_option_list/{arg1?}', 'Components_dataController@punto_recaud_id_option_list');	
	Route::get('components_data/arqueorecid_option_list/{arg1?}', 'Components_dataController@arqueorecid_option_list');	
	Route::get('components_data/servicio_id_option_list/{arg1?}', 'Components_dataController@servicio_id_option_list');	
	Route::get('components_data/users_username_exist/{arg1?}', 'Components_dataController@users_username_exist');	
	Route::get('components_data/users_email_exist/{arg1?}', 'Components_dataController@users_email_exist');	
	Route::get('components_data/role_id_option_list/{arg1?}', 'Components_dataController@role_id_option_list');


/* routes for FileUpload Controller  */	
Route::post('fileuploader/upload/{fieldname}', 'FileUploaderController@upload');
Route::post('fileuploader/s3upload/{fieldname}', 'FileUploaderController@s3upload');
Route::post('fileuploader/remove_temp_file', 'FileUploaderController@remove_temp_file');


Route::get('/servicios', [TblServiciosController::class, 'obtenerServicios']);
Route::post('/registros', 'ActaentregadetController@nuevo'); // Crear nueva licencia
Route::put('/registros/{id}', 'ActaentregadetController@nuevo');

Route::get('/actas/index/{filter?}/{filtervalue?}', 'ActaentregacabController@index');
Route::get('/actas/cabecera/{rec_id}', 'ActaentregacabController@showActaWithDet');
Route::post('/actas/cabecera', 'ActaentregacabController@showMultipleActas');

Route::post('/actas', [ActaentregacabController::class, 'store']);

Route::get('tblpuntosrecaudacion/index/{filter?}/{filtervalue?}', 'TblPuntosRecaudacionController@index');