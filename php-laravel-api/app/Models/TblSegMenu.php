<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblSegMenu extends Model
{
    protected $table = 'tbl_seg_menu';
    protected $primaryKey = 'me_id';
    public $timestamps = false;

    protected $fillable = [
        'me_descripcion',
        'me_url',
        'me_icono',
        'me_id_padre',
        'me_vista',
        'me_orden',
        'me_estado',
        'me_usuario_creacion',
        'me_fecha_creacion'
    ];

    public function parent()
    {
        return $this->belongsTo(TblSegMenu::class, 'me_id_padre');
    }

    public function children()
    {
        return $this->hasMany(TblSegMenu::class, 'me_id_padre');
    }
}
