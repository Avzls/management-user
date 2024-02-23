<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('Roles/Index', [
            'roles' => Role::all()
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:roles,name']
        ]);

        Role::create($validatedData);

        return redirect('/roles')->with('message', 'Role Created Successfully');
    }

    public function edit(Role $Role)
    {
        return Inertia::render('Roles/Edit', [
            'Role' => $Role
        ]);
    }

    public function update(Request $request, Role $Role)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:roles,name']
        ]);

        Role::where('id', $Role->id)->update($validatedData);

        return redirect('/roles')->with('message', 'Role has been Updated');
    }

    public function destroy(Role $Role)
    {
        Role::destroy($Role->id);

        return redirect('/roles')->with('message', 'Role has been Deleted');
    }
}
