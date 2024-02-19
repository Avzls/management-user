<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Route::get('/users', function () {
//     return Inertia::render('Users/Index');
// })->middleware(['auth', 'verified']);

Route::resource('/users', UserController::class);
// Route::resource('/roles', RoleController::class);

Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
Route::get('/roles/{id}/edit', [RoleController::class, 'edit'])->name('roles.edit'); // Menampilkan halaman edit role
Route::put('/roles/{id}', [RoleController::class, 'update'])->name('roles.update'); // Menyimpan perubahan pada role


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//     Route::get('/manage-users', [UserController::class, 'index'])->name('manage-users');
// });

require __DIR__ . '/auth.php';
