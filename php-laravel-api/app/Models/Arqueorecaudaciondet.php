<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ArqueorecaudacionDet extends Model
{
    protected $table = 'arqueorecaudaciondet';
    protected $primaryKey = 'arqueorecdetid';
    public $timestamps = false;

    protected $fillable = [
        'arqueorecid',
        'servicio_id',
        'arqueodetcantidad',
        'arqueodettarifabs',
        'arqueodetimportebs',
        'arqueoestado'
    ];

    public static function listFields()
    {
        return [
            "arqueorecdetid",
            "arqueorecid",
            "servicio_id",
            "arqueodetcantidad",
            "arqueodettarifabs",
            "arqueodetimportebs",
            "arqueoestado"
        ];
    }

    public static function viewFields()
    {
        return self::listFields();
    }

    public static function editFields()
    {
        return self::listFields();
    }

    public function cabecera()
    {
        return $this->belongsTo(ArqueorecaudacionCab::class, 'arqueorecid', 'arqueorecid');
    }

    public function servicio()
    {
        return $this->belongsTo(TblServicios::class, 'servicio_id', 'servicio_id');
    }
}
