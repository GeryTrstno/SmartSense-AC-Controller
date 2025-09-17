<?php

use App\Http\Controllers\AnalyticsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('control', function () {
        return Inertia::render('control');
    })->name('control');

    Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
