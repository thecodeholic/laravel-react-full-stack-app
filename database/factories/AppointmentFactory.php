namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Appointment;

class AppointmentFactory extends Factory
{
protected $model = Appointment::class;

public function definition()
{
return [
'information' => $this->faker->sentence,
'time' => $this->faker->dateTime,
'type' => $this->faker->randomElement(['fitting', 'new_customer', 'last_fitting']),
];
}
}
