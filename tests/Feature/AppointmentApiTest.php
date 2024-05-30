namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Appointment;
use App\Models\User;

class AppointmentApiTest extends TestCase
{
use RefreshDatabase;

/** @test */
public function it_can_create_an_appointment()
{
$user = User::factory()->create(); // Create a test user

$response = $this->actingAs($user)->postJson('/api/appointments', [
'information' => 'Initial Consultation',
'time' => '29-05-2024 14:00',
'type' => 'fitting',
]);

$response->assertStatus(201)
->assertJsonStructure([
'data' => [
'id',
'information',
'appointment_time',
'appointment_type',
],
]);

$this->assertDatabaseHas('appointments', [
'information' => 'Initial Consultation',
]);
}

/** @test */
public function it_can_get_appointments()
{
$user = User::factory()->create(); // Create a test user
$this->actingAs($user);

Appointment::factory()->create([
'information' => 'Initial Consultation',
'time' => '2024-05-29 14:00:00',
'type' => 'fitting',
]);

$response = $this->getJson('/api/appointments');

$response->assertStatus(200)
->assertJsonStructure([
'data' => [
'*' => [
'id',
'information',
'appointment_time',
'appointment_type',
],
],
]);
}
}
