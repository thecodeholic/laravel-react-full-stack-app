<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['information', 'time', 'type'];

    protected $casts = [
        'time' => 'datetime',
        'type' => 'string',
    ];

    public function customers(){
        return $this->belongsToMany(Customer::class, 'customers_appointments');
    }

}
