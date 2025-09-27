<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\SensorController;
use App\Http\Controllers\OnOffController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/sensor-readings', [SensorController::class, 'store']);

Route::get('control/command/latest', [OnOffController::class, 'getLatestCommand']);
