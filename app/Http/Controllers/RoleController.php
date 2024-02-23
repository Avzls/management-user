<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('users')->get();

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function edit($id)
    {
        $role = Role::findOrFail($id);
        $roles = Role::all(); // Ambil semua data roles
        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'roles' => $roles, // Kirim data roles ke komponen React
        ]);
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'role' => 'required|string|max:255',
        ]);

        $role = Role::findOrFail($id);
        $role->update($validatedData);

        return redirect()->route('roles.index')->with('success', 'Role updated successfully.');
    }
}
