<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActaentregacabAddRequest;
use App\Http\Requests\ActaentregacabEditRequest;
use App\Models\Actaentregacab;
use App\Models\Actaentregadet;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class ActaentregacabController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $filter = null, $filtervalue = null){
		$query = Actaentregacab::query()->with(['puntoRecaudacion:punto_recaud_id,puntorecaud_nombre']);

        if ($filter && $filtervalue) {
            $query->where($filter, $filtervalue);
        }
    
        if ($request->has('ae_estado') && !empty($request->ae_estado)) {
            $query->where('ae_estado', $request->ae_estado);
        }
    
        if ($request->has('ae_fecha') && !empty($request->ae_fecha)) {
            $query->whereDate('ae_fecha', $request->ae_fecha);
        }

		if($request->search){
			$search = trim($request->search);
			Actaentregacab::search($query, $search);
		}
		$orderby = $request->orderby ?? "actaentregacab.ae_actaid";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		// if($fieldname){
		// 	$query->where($fieldname , $fieldvalue); //filter by a single field name
		// }
		$records = $query->select(Actaentregacab::listFields())->get();
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = Actaentregacab::query();
		$record = $query->findOrFail($rec_id, Actaentregacab::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(ActaentregacabAddRequest $request){
		$modeldata = $request->validated();
		
		//save Actaentregacab record
		$record = Actaentregacab::create($modeldata);
		$rec_id = $record->ae_actaid;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(ActaentregacabEditRequest $request, $rec_id = null){
		$query = Actaentregacab::query();
		$record = $query->findOrFail($rec_id, Actaentregacab::editFields());
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
		$query = Actaentregacab::query();
		$query->whereIn("ae_actaid", $arr_id);
		$query->delete();
		return $this->respond($arr_id);
	}

	public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            // Guardar en la tabla actaentregacab
            $actaCab = [
                'ae_observacion' => $request->observacion,
                'ae_recaudaciontotalbs' => $request->recaudacion_total,
                'punto_recaud_id' => $request->punto_recaudacion,
                'ae_fecha' => $request->fecha,
                'ae_grupo' => $request->grupo,
                'ae_operador1erturno' => $request->operador_1er_turno,
                'ae_operador2doturno' => $request->operador_2do_turno,
                'ae_cambiobs' => $request->cambio_bs,
                'ae_cajachicabs' => $request->caja_chica_bs,
                'ae_llaves' => $request->llaves,
                'ae_fechero' => $request->fechero,
                'ae_tampo' => $request->tampo,
                'ae_candados' => $request->candados,
                'ae_estado' => "P",
            ];
            $record = Actaentregacab::create($actaCab);
            // Verifica que el ID se haya generado correctamente
            if (!$actaCab || !$record->ae_actaid) {
                throw new \Exception("No se pudo obtener el ID del acta creada.");
            }
            // Guardar los registros en actaentregadet
            foreach ($request->registros as $registro) {
                Actaentregadet::create([
                    'ae_actaid' => $record->ae_actaid,
                    //'ae_actaid' => $registro['id'],
                    'servicio_id' => $registro['tipo_servicio'],
                    'aed_desdenumero' => $registro['desde_numero'],
                    'aed_hastanumero' => $registro['hasta_numero'],
                    'aed_vendidohasta' => $registro['cantidad_boletos'],
                    'aed_cantidad' => $registro['cantidad_boletos'],
                    'aed_preciounitario' => $registro['precio_unitario'],
                    'aed_importebs' => $registro['importe_total'],
                    'aed_estado' => "P",
                ]);
            }

            DB::commit();
            return response()->json(['message' => 'Acta guardada correctamente'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al guardar el acta', 'details' => $e->getMessage()], 500);
        }
    }

    public function showActaWithDet($actaId)
    {
        $cabecera = Actaentregacab::obtenerDatosConPunto($actaId);

        $detalles = Actaentregadet::where('ae_actaid', $actaId)
            ->join('tbl_servicios', 'actaentregadet.servicio_id', '=', 'tbl_servicios.servicio_id')
            ->select(
                'actaentregadet.*', 
                'tbl_servicios.servicio_abreviatura',
                'tbl_servicios.servicio_descripcion'
            )
            ->get();

        return response()->json([
            'cabecera' => $cabecera,
            'detalles' => $detalles,
        ]);
    }

    public function showMultipleActas(Request $request){
        $recIds = $request->input('rec_ids');
        
        $actas = [];
        foreach ($recIds as $recId) {
            $cabecera = Actaentregacab::obtenerDatosConPunto($recId);
            $detalles = Actaentregadet::where('ae_actaid', $recId)
                ->join('tbl_servicios', 'actaentregadet.servicio_id', '=', 'tbl_servicios.servicio_id')
                ->select(
                    'actaentregadet.*',
                    'tbl_servicios.servicio_abreviatura',
                    'tbl_servicios.servicio_descripcion'
                )
                ->get();

            $actas[] = [
                'cabecera' => $cabecera,
                'detalles' => $detalles
            ];
        }

        return response()->json($actas);
    }
}
