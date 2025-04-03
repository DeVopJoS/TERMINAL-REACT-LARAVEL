<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\ArqueocabAddRequest;
use App\Http\Requests\ArqueocabEditRequest;
use App\Models\Arqueocab;
use Illuminate\Http\Request;
use Exception;
class ArqueocabController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = Arqueocab::query();
		if($request->search){
			$search = trim($request->search);
			Arqueocab::search($query, $search);
		}
		$orderby = $request->orderby ?? "arqueocab.arqueoid";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, Arqueocab::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	public function view($rec_id = null) {
		try {
			$query = Arqueocab::query();
			$record = $query->select([
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
				'diferenciatipo', 
				'arqueoobservacion',
				'arqueoestado',
				'arqueofecharegistro',
				'arqueousuario'
			])->findOrFail($rec_id);
			
			return $this->respond($record);
		} catch (Exception $e) {
			return response()->json(['error' => $e->getMessage()], 500);
		}
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(ArqueocabAddRequest $request){
		$modeldata = $request->validated();
		
		//save Arqueocab record
		$record = Arqueocab::create($modeldata);
		$rec_id = $record->arqueoid;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(ArqueocabEditRequest $request, $rec_id = null){
		$query = Arqueocab::query();
		$record = $query->findOrFail($rec_id, Arqueocab::editFields());
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
		$query = Arqueocab::query();
		$query->whereIn("arqueoid", $arr_id);
		$query->delete();
		return $this->respond($arr_id);
	}
}
