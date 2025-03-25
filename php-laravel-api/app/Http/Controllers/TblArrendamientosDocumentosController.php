<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\TblArrendamientosDocumentosAddRequest;
use App\Http\Requests\TblArrendamientosDocumentosEditRequest;
use App\Models\TblArrendamientosDocumentos;
use Illuminate\Http\Request;
use Exception;
class TblArrendamientosDocumentosController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = TblArrendamientosDocumentos::query();
		if($request->search){
			$search = trim($request->search);
			TblArrendamientosDocumentos::search($query, $search);
		}
		$orderby = $request->orderby ?? "tbl_arrendamientos_documentos.documento_id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, TblArrendamientosDocumentos::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = TblArrendamientosDocumentos::query();
		$record = $query->findOrFail($rec_id, TblArrendamientosDocumentos::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(TblArrendamientosDocumentosAddRequest $request){
		$modeldata = $request->validated();
		
		//save TblArrendamientosDocumentos record
		$record = TblArrendamientosDocumentos::create($modeldata);
		$rec_id = $record->documento_id;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(TblArrendamientosDocumentosEditRequest $request, $rec_id = null){
		$query = TblArrendamientosDocumentos::query();
		$record = $query->findOrFail($rec_id, TblArrendamientosDocumentos::editFields());
		if ($request->isMethod('post')) {
			$modeldata = $request->validated();
			$record->update($modeldata);
		}
		return $this->respond($record);
	}
	

	/**
     * Delete record from the database
	 * Support multi delete by separating record id by comma.
	 * @param  \Illuminate\Http\Request
	 * @param string $rec_id //can be separated by comma 
     * @return \Illuminate\Http\Response
     */
	function delete(Request $request, $rec_id = null){
		$arr_id = explode(",", $rec_id);
		$query = TblArrendamientosDocumentos::query();
		$query->whereIn("documento_id", $arr_id);
		$query->delete();
		return $this->respond($arr_id);
	}
}
