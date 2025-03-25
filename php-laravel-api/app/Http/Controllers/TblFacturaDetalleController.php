<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\TblFacturaDetalleAddRequest;
use App\Http\Requests\TblFacturaDetalleEditRequest;
use App\Models\TblFacturaDetalle;
use Illuminate\Http\Request;
use Exception;
class TblFacturaDetalleController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = TblFacturaDetalle::query();
		if($request->search){
			$search = trim($request->search);
			TblFacturaDetalle::search($query, $search);
		}
		$orderby = $request->orderby ?? "tbl_factura_detalle.detalle_id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, TblFacturaDetalle::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = TblFacturaDetalle::query();
		$record = $query->findOrFail($rec_id, TblFacturaDetalle::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(TblFacturaDetalleAddRequest $request){
		$modeldata = $request->validated();
		
		//save TblFacturaDetalle record
		$record = TblFacturaDetalle::create($modeldata);
		$rec_id = $record->detalle_id;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(TblFacturaDetalleEditRequest $request, $rec_id = null){
		$query = TblFacturaDetalle::query();
		$record = $query->findOrFail($rec_id, TblFacturaDetalle::editFields());
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
		$query = TblFacturaDetalle::query();
		$query->whereIn("detalle_id", $arr_id);
		$query->delete();
		return $this->respond($arr_id);
	}
}
