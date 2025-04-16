<?php

namespace App\Http\Controllers;

use App\Models\TblSegMenu;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Storage;

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
                
                if ($item->me_icono && $this->isStoredImage($item->me_icono)) {
                    $item->me_icono = asset('storage/' . $item->me_icono);
                }
                
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
            
            if ($record->me_icono && $this->isStoredImage($record->me_icono)) {
                $record->me_icono = asset('storage/' . $record->me_icono);
            }
            
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
                'icon_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120'
            ]);

            $data = $request->except('icon_file');
            if ($request->hasFile('icon_file')) {
                $path = $request->file('icon_file')->store('', 'public');
                $data['me_icono'] = $path;
            }
            
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
            
            if ($record->me_icono && $this->isStoredImage($record->me_icono)) {
                $record->me_icono = asset('storage/' . $record->me_icono);
            }
            
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
                'icon_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120'
            ]);
            
            $data = $request->except('icon_file');
            $record = TblSegMenu::findOrFail($id);
            
            if ($data['me_id_padre'] == $id) {
                return response()->json(['error' => 'Un menú no puede ser padre de sí mismo'], 422);
            }
            
            if ($this->wouldCreateCycle($id, $data['me_id_padre'])) {
                return response()->json(['error' => 'Esta operación crearía un ciclo en la jerarquía de menús'], 422);
            }
            
            if ($request->hasFile('icon_file')) {
                if ($record->me_icono && $this->isStoredImage($record->me_icono)) {
                    Storage::disk('public')->delete($record->me_icono);
                }
                
                $path = $request->file('icon_file')->store('', 'public');
                $data['me_icono'] = $path;
            }

            if (isset($data['me_estado']) && $data['me_estado'] === 'V' && $record->me_estado === 'C') {
                $this->setEstadoRecursivo($id, 'V');
            }
            
            else if (isset($data['me_estado']) && $data['me_estado'] === 'C') {
                $this->setEstadoRecursivo($id, 'C');
            }

            $record->update($data);
            
            if ($record->me_icono && $this->isStoredImage($record->me_icono)) {
                $record->me_icono = asset('storage/' . $record->me_icono);
            }
            
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

            $this->deleteChildrenRecursive($id);

            if ($record->me_icono && $this->isStoredImage($record->me_icono)) {
                Storage::disk('public')->delete($record->me_icono);
            }

            $record->delete();

            return response()->json(['success' => true, 'message' => 'Menú y submenús eliminados correctamente']);
        }
        catch(Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function deleteChildrenRecursive($parentId)
    {
        $hijos = TblSegMenu::where('me_id_padre', $parentId)->get();
        foreach ($hijos as $hijo) {
            $this->deleteChildrenRecursive($hijo->me_id);

            if ($hijo->me_icono && $this->isStoredImage($hijo->me_icono)) {
                Storage::disk('public')->delete($hijo->me_icono);
            }

            $hijo->delete();
        }
    }
    
    private function isStoredImage($iconValue)
    {
        return $iconValue && 
               !str_starts_with($iconValue, 'pi pi-') && 
               Storage::disk('public')->exists($iconValue);
    }

    /**
     * Desactiva recursivamente todos los hijos de un menú.
     */
    private function setEstadoRecursivo($parentId, $estado)
    {
        $hijos = TblSegMenu::where('me_id_padre', $parentId)->get();
        foreach ($hijos as $hijo) {
            if ($hijo->me_estado !== $estado) {
                $hijo->me_estado = $estado;
                $hijo->save();
                $this->setEstadoRecursivo($hijo->me_id, $estado);
            }
        }
    }
}
