<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\TblArrendamientosAddRequest;
use App\Http\Requests\TblArrendamientosEditRequest;
use App\Models\TblArrendamientos;
use Illuminate\Http\Request;
use \PDF;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TblarrendamientosListExport;
use Exception;
class TblArrendamientosController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = TblArrendamientos::query();
		if($request->search){
			$search = trim($request->search);
			TblArrendamientos::search($query, $search);
		}
		$orderby = $request->orderby ?? "tbl_arrendamientos.arrendamiento_id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		// if request format is for export example:- product/index?export=pdf
		if($this->getExportFormat()){
			return $this->ExportList($query); // export current query
		}
		$records = $this->paginate($query, TblArrendamientos::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = TblArrendamientos::query();
		$record = $query->findOrFail($rec_id, TblArrendamientos::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(TblArrendamientosAddRequest $request){
		$modeldata = $request->validated();
		
		//save TblArrendamientos record
		$record = TblArrendamientos::create($modeldata);
		$rec_id = $record->arrendamiento_id;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(TblArrendamientosEditRequest $request, $rec_id = null){
		$query = TblArrendamientos::query();
		$record = $query->findOrFail($rec_id, TblArrendamientos::editFields());
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
		$query = TblArrendamientos::query();
		$query->whereIn("arrendamiento_id", $arr_id);
		$query->delete();
		return $this->respond($arr_id);
	}
	

	/**
     * Export table records to different format
	 * supported format:- PDF, CSV, EXCEL, HTML
	 * @param \Illuminate\Database\Eloquent\Model $query
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
	private function ExportList($query){
		ob_end_clean(); // clean any output to allow file download
		$filename = "ListTblArrendamientosReport-" . date_now();
		$format = $this->getExportFormat();
		if($format == "print"){
			$records = $query->get(TblArrendamientos::exportListFields());
			return view("reports.tblarrendamientos-list", ["records" => $records]);
		}
		elseif($format == "pdf"){
			$records = $query->get(TblArrendamientos::exportListFields());
			$pdf = PDF::loadView("reports.tblarrendamientos-list", ["records" => $records]);
			return $pdf->download("$filename.pdf");
		}
		elseif($format == "csv"){
			return Excel::download(new TblarrendamientosListExport($query), "$filename.csv", \Maatwebsite\Excel\Excel::CSV);
		}
		elseif($format == "excel"){
			return Excel::download(new TblarrendamientosListExport($query), "$filename.xlsx", \Maatwebsite\Excel\Excel::XLSX);
		}
	}
}
