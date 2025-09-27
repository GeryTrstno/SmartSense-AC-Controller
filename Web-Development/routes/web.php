<?php

use App\Http\Controllers\AnalyticsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OnOffController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('control', function () {
        return Inertia::render('control');
    })->name('control');

    Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics');

    Route::get('testing', function () {
        return Inertia::render('testing');
    })->name('testing');

    Route::post('control/send-command', [OnOffController::class, 'sendCommand'])->name('control.sendCommand');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
