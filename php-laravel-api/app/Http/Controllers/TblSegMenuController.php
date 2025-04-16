<?php

namespace App\Http\Controllers;

use App\Models\TblSegMenu;
use Illuminate\Http\Request;
use Exception;

class TblSegMenuController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = TblSegMenu::query();
            
            if ($request->search) {
                $query->where('me_descripcion', 'like', "%$request->search%");
            }
            
            $records = $query->orderBy('me_id_padre')->orderBy('me_orden')->get();
            
            $records = $records->map(function($item) {
                $item->me_id = (int)$item->me_id;
                $item->me_id_padre = (int)$item->me_id_padre;
                return $item;
            });
            
            return response()->json($records);
        }
        catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function view($id)
    {
        try {
            $record = TblSegMenu::findOrFail($id);
            return $this->respond($record);
        }
        catch(Exception $e) {
            return $this->respondWithError($e->getMessage());
        }
    }

    public function add(Request $request)
    {
        try {
            $request->validate([
                'me_descripcion' => 'required|string|max:100',
                'me_url' => 'nullable|string|max:255',
                'me_icono' => 'nullable|string|max:255',
                'me_id_padre' => 'nullable|integer',
            ]);

            $data = $request->all();
            
            $data['me_fecha_creacion'] = now();
            $data['me_usuario_creacion'] = auth()->id() ?? 1;
            $data['me_estado'] = $data['me_estado'] ?? 'V';
            $data['me_vista'] = $data['me_vista'] ?? 1;
            
            if (empty($data['me_orden'])) {
                $parentId = $data['me_id_padre'] ?? 0;
                $maxOrder = TblSegMenu::where('me_id_padre', $parentId)->max('me_orden') ?? 0;
                $data['me_orden'] = $maxOrder + 1;
            }
            
            $data['me_id_padre'] = $data['me_id_padre'] ?? 0;
            
            $record = TblSegMenu::create($data);
            
            return $this->respond($record);
        }
        catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function edit($id, Request $request)
    {
        try {
            $request->validate([
                'me_descripcion' => 'required|string|max:100',
                'me_url' => 'nullable|string|max:255',
                'me_icono' => 'nullable|string|max:255',
                'me_id_padre' => 'nullable|integer',
            ]);
            
            $data = $request->all();
            $record = TblSegMenu::findOrFail($id);
            
            if ($data['me_id_padre'] == $id) {
                return response()->json(['error' => 'Un menú no puede ser padre de sí mismo'], 422);
            }
            
            if ($this->wouldCreateCycle($id, $data['me_id_padre'])) {
                return response()->json(['error' => 'Esta operación crearía un ciclo en la jerarquía de menús'], 422);
            }
            
            $record->update($data);
            
            return $this->respond($record);
        }
        catch(Exception $e) {
            return $this->respondWithError($e->getMessage());
        }
    }

    private function wouldCreateCycle($menuId, $newParentId)
    {
        if ($newParentId == 0) {
            return false;
        }
        
        $currentParentId = $newParentId;
        $visited = [$menuId];
        
        while ($currentParentId != 0) {
            if (in_array($currentParentId, $visited)) {
                return true;
            }
            
            $visited[] = $currentParentId;
            $parent = TblSegMenu::find($currentParentId);
            
            if (!$parent) {
                return false;
            }
            
            $currentParentId = $parent->me_id_padre;
        }
        
        return false;
    }

    public function delete($id)
    {
        try {
            $record = TblSegMenu::findOrFail($id);
            
            $hasChildren = TblSegMenu::where('me_id_padre', $id)->exists();
            
            if ($hasChildren) {
                return response()->json(['error' => 'No se puede eliminar un menú que tiene submenús'], 422);
            }
            
            $record->delete();
            
            return $this->respondDeleted();
        }
        catch(Exception $e) {
            return $this->respondWithError($e->getMessage());
        }
    }
}
