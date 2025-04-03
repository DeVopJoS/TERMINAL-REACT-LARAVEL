<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposito extends Model
{
    protected $table = 'tbl_depositos';
    protected $primaryKey = 'deposito_id';
    public $timestamps = false;

    protected $fillable = [
        'codigo',
        'fecha_recaudacion',
        'fecha_deposito_1',
        'numero_deposito_1',
        'efectivo_1',
        'fecha_deposito_2',
        'numero_deposito_2',
        'efectivo_2',
        'total_efectivo',
        'depositantes',
        'observacion'
    ];

    protected $casts = [
        'fecha_recaudacion' => 'date',
        'fecha_deposito_1' => 'date',
        'fecha_deposito_2' => 'date',
        'efectivo_1' => 'decimal:2',
        'efectivo_2' => 'decimal:2',
        'total_efectivo' => 'decimal:2'
    ];
}
