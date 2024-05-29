<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'information' =>'required|string|max:255',
            'time' => 'required|date_format:d-m-Y H:i',
            'type' => 'required|in:fitting,new_customer,last_fitting'
        ];
    }
}
