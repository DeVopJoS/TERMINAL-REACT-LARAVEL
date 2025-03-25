<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\TblEdificioAmbienteAddRequest;
use App\Http\Requests\TblEdificioAmbienteEditRequest;
use App\Models\TblEdificioAmbiente;
use Illuminate\Http\Request;
use Exception;
class TblEdificioAmbienteController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = TblEdificioAmbiente::query();
		if($request->search){
			$search = trim($request->search);
			TblEdificioAmbiente::search($query, $search);
		}
		$orderby = $request->orderby ?? "tbl_edificio_ambiente.ambiente_id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, TblEdificioAmbiente::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = TblEdificioAmbiente::query();
		$record = $query->findOrFail($rec_id, TblEdificioAmbiente::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(TblEdificioAmbienteAddRequest $request){
		$modeldata = $request->validated();
		
		//save TblEdificioAmbiente record
		$record = TblEdificioAmbiente::create($modeldata);
		$rec_id = $record->ambiente_id;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(TblEdificioAmbienteEditRequest $request, $rec_id = null){
		$query = TblEdificioAmbiente::query();
		$record = $query->findOrFail($rec_id, TblEdificioAmbiente::editFields());
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
		$query = TblEdificioAmbiente::query();
		$query->whereIn("ambiente_id", $arr_id);
		$query->delete();
		return $this->respond($arr_id);
	}
}
