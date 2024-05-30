<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class AppointmentResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'information' => $this->information,
            'time' => $this->time->format('d-m-Y H:i'), // Format datetime
            'type' => $this->type, // Use specific naming for clarity
        ];
    }
}
