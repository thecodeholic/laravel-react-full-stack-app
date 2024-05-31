<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use App\Models\Customer;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return AppointmentResource::collection(
            Appointment::with('customers')->orderBy('time', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAppointmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAppointmentRequest $request)
    {
        $validated = $request->validate([
            'information' => 'required|string|max:255',
            'time' => 'required|date_format:d-m-Y H:i',
            'type' => 'required|string',
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
        ]);

        // Create or find the customer
        $customer = Customer::firstOrCreate(
            ['phone' => $validated['customer_phone']],
            ['name' => $validated['customer_name']]
        );

        // Create the appointment
        $appointment = Appointment::create($validated);

        // Attach the customer to the appointment
        $appointment->customers()->attach($customer->id);

        return new AppointmentResource($appointment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
        return new AppointmentResource($appointment->load('customers'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAppointmentRequest  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAppointmentRequest $request, Appointment $appointment)
    {
        $data = $request->validated();
        $appointment->load('customers')->update($data);

        return new AppointmentResource($appointment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response("", 204);
    }
}
