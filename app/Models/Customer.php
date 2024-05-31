<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['phone', 'name','instagram',];

    protected $casts = [
        'status' => 'string',
    ];

    public function appointments(){
        return $this->belongsToMany(Appointment::class, 'customers_appointments');
    }
}
