<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Sensor;

class DashboardController extends Controller
{
    public function index()
    {

        $latestreading = Sensor::latest()->first();

        $history1hour = Sensor::where('created_at', '>=', now()->subHour())->get();
        $history1day = Sensor::where('created_at', '>=', now()->subDay())->get();
        $history1week = Sensor::where('created_at', '>=', now()->subWeek())->get();

        return Inertia::render('dashboard', [
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => route('dashboard')],
            ],
            'latestreading' => $latestreading,
            'historicalData' => [
                'hourly' => $history1hour,
                'daily' => $history1day,
                'weekly' => $history1week,
            ],
        ]);
    }
}
