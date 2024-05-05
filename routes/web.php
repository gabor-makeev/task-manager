<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TaskController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/tasks/create', [TaskController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('task.create');

Route::get('/tasks/{task}', [TaskController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('task.show');

Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('task.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/tasks', [TaskController::class, 'store'])->name('task.store');

require __DIR__.'/auth.php';
