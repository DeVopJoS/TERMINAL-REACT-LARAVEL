<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ArqueorecaudacionCab;
use App\Models\ArqueorecaudacionDet;
use App\Models\TblServicios;
use App\Models\TblPuntosRecaudacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class ArqueoRecaudacionController extends Controller
{
    /**
     * Display a listing of arqueo recaudacion records.
     */
    public function index(Request $request)
    {
        try {
            $query = ArqueorecaudacionCab::with(['puntoRecaudacion', 'detalles.servicio']);
            
            if($request->search) {
                $search = trim($request->search);
                $query->where(function($query) use ($search) {
                    $query->where('arqueocorrelativo', 'like', "%$search%")
                        ->orWhere('arqueonombreoperador', 'like', "%$search%")
                        ->orWhere('arqueonombresupervisor', 'like', "%$search%");
                });
            }
            
            if($request->fecha_desde && $request->fecha_hasta) {
                $query->whereBetween('arqueofecha', [$request->fecha_desde, $request->fecha_hasta]);
            }
            
            if($request->turno) {
                $query->where('arqueoturno', $request->turno);
            }
            
            if($request->punto_recaud_id) {
                $query->where('punto_recaud_id', $request->punto_recaud_id);
            }
            
            $records = $query->orderBy('arqueofecha', 'desc')
                           ->orderBy('arqueocorrelativo', 'desc')
                           ->get();
            
            return response()->json($records);
            
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    /**
     * Store a newly created arqueo record.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            // Crear cabecera de arqueo
            $cabecera = ArqueorecaudacionCab::create([
                'arqueocorrelativo' => $request->arqueocorrelativo,
                'arqueofecha' => $request->arqueofecha,
                'arqueoturno' => $request->arqueoturno,
                'punto_recaud_id' => $request->punto_recaud_id,
                'arqueonombreoperador' => $request->arqueonombreoperador,
                'arqueousuario' => $request->user()->id,
                'arqueofecharegistro' => now(),
                'arqueoid' => $request->arqueoid,
                'arqueoestado' => 'V', // Abierto por defecto
                'arqueonombresupervisor' => $request->arqueonombresupervisor
            ]);
            
            // Crear detalles
            $total = 0;
            foreach($request->detalles as $item) {
                $importe = $item['arqueodetcantidad'] * $item['arqueodettarifabs'];
                
                ArqueorecaudacionDet::create([
                    'arqueorecid' => $cabecera->arqueorecid,
                    'servicio_id' => $item['servicio_id'],
                    'arqueodetcantidad' => $item['arqueodetcantidad'],
                    'arqueodettarifabs' => $item['arqueodettarifabs'],
                    'arqueodetimportebs' => $importe,
                    'arqueoestado' => 'V'
                ]);
                
                $total += $importe;
            }
            
            DB::commit();
            return $this->respond([
                'success' => true,
                'message' => 'Arqueo creado correctamente',
                'data' => $cabecera
            ]);
        } catch (Exception $e) {
            DB::rollback();
            return $this->respond([
                'success' => false,
                'message' => 'Error al crear arqueo: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Display the specified resource.
     */
    public function view($id)
    {
        try {
            $arqueo = ArqueorecaudacionCab::with(['detalles' => function($query) {
                $query->with('servicio');
            }, 'puntoRecaudacion'])->findOrFail($id);
            
            return $this->respond($arqueo);
        } catch (Exception $e) {
            return $this->respond([
                'success' => false,
                'message' => 'Error al cargar arqueo: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Update the specified resource.
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $arqueo = ArqueorecaudacionCab::findOrFail($id);
            
            // Actualizar la cabecera
            $arqueo->update([
                'arqueofecha' => $request->arqueofecha,
                'arqueoturno' => $request->arqueoturno,
                'punto_recaud_id' => $request->punto_recaud_id,
                'arqueonombreoperador' => $request->arqueonombreoperador,
                'arqueonombresupervisor' => $request->arqueonombresupervisor,
                'arqueoestado' => $request->arqueoestado
            ]);
            
            // Eliminar detalles existentes y crear nuevos
            ArqueorecaudacionDet::where('arqueorecid', $id)->delete();
            
            foreach($request->detalles as $item) {
                $importe = $item['arqueodetcantidad'] * $item['arqueodettarifabs'];
                
                ArqueorecaudacionDet::create([
                    'arqueorecid' => $arqueo->arqueorecid,
                    'servicio_id' => $item['servicio_id'],
                    'arqueodetcantidad' => $item['arqueodetcantidad'],
                    'arqueodettarifabs' => $item['arqueodettarifabs'],
                    'arqueodetimportebs' => $importe,
                    'arqueoestado' => 'V'
                ]);
            }
            
            DB::commit();
            return $this->respond([
                'success' => true,
                'message' => 'Arqueo actualizado correctamente',
                'data' => $arqueo
            ]);
        } catch (Exception $e) {
            DB::rollback();
            return $this->respond([
                'success' => false,
                'message' => 'Error al actualizar arqueo: ' . $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get puntos de recaudacion
     */
    public function getPuntosRecaudacion()
    {
        try {
            $puntos = TblPuntosRecaudacion::where('puntorecaud_estado', 'A')
                ->select(
                    'punto_recaud_id as value',
                    'puntorecaud_nombre as label'
                )
                ->get();
                
            return response()->json($puntos);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    /**
     * Get servicios
     */
    public function getServicios()
    {
        try {
            $servicios = TblServicios::where('servicio_estado', 'A')
                ->select(
                    'servicio_id as value',
                    'servicio_descripcion as label',
                    'servicio_precio_base as precio'
                )
                ->get();
                
            return response()->json($servicios);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    /**
     * Get next correlativo
     */
    public function getNextCorrelativo()
    {
        $maxCorrelativo = ArqueorecaudacionCab::max('arqueocorrelativo') ?? 0;
        return $this->respond(['correlativo' => $maxCorrelativo + 1]);
    }
}
