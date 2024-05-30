<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['phone', 'name'];

    public function appointments(){
        return $this->belongsToMany(Appointment::class, 'customer_appointment');
    }
}
