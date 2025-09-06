<?php

namespace App\Events;

use App\Models\Sensor;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewSensorReading implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $reading;
    /**
     * Create a new event instance.
     */
    public function __construct(Sensor $reading)
    {
        $this->reading = $reading;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */

    public function broadcastWith(): array
    {
        // Secara eksplisit kita tentukan struktur datanya di sini
        return [
            'id' => $this->reading->id,
            'temperature' => $this->reading->temperature,
            'humidity' => $this->reading->humidity,
            'motion_detected' => $this->reading->motion_detected,
            'created_at' => $this->reading->created_at->toDateTimeString(),
        ];
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('sensor-data'),
        ];
    }
}
