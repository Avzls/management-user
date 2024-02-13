<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class RoleController extends Controller
{
    public function index()
{
    $users = User::with('role')->get();
    $roles = Role::all();
    
    return Inertia::render('Roles/Index', ['users' => $users, 'roles' => $roles]);
}

}
