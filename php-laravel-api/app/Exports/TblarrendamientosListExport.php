<?php 

namespace App\Exports;
use App\Models\TblArrendamientos;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
class TblarrendamientosListExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize
{
	
	protected $query;
	
    public function __construct($query)
    {
        $this->query = $query->select(TblArrendamientos::exportListFields());
    }
	
    public function query()
    {
        return $this->query;
    }
	
	public function headings(): array
    {
        return [
			'Arrendamiento Id',
			'Ambiente Id',
			'Num Contrato',
			'Operador Nombre',
			'Arrendatario Nombre',
			'Arrendatario Apellido Paterno',
			'Arrendatario Apellido Materno',
			'Arrendatario Ci',
			'Arrendatario Nombre Comercial',
			'Arrendatario Telefono',
			'Arrendatario Celular',
			'Ambiente Codigo',
			'Arrendamiento Fecha Inicio',
			'Arrendamiento Fecha Fin',
			'Arrendamiento Canon',
			'Arrendamiento Funcion',
			'Arrendamiento Forma Pago',
			'Arrendamiento Estado',
			'Arrendamiento Fecha'
        ];
    }
	
    public function map($record): array
    {
        return [
			$record->arrendamiento_id,
			$record->ambiente_id,
			$record->num_contrato,
			$record->operador_nombre,
			$record->arrendatario_nombre,
			$record->arrendatario_apellido_paterno,
			$record->arrendatario_apellido_materno,
			$record->arrendatario_ci,
			$record->arrendatario_nombre_comercial,
			$record->arrendatario_telefono,
			$record->arrendatario_celular,
			$record->ambiente_codigo,
			$record->arrendamiento_fecha_inicio,
			$record->arrendamiento_fecha_fin,
			$record->arrendamiento_canon,
			$record->arrendamiento_funcion,
			$record->arrendamiento_forma_pago,
			$record->arrendamiento_estado,
			$record->arrendamiento_fecha
        ];
    }
}
