<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

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


    public function addPermissionToRole($roleId)
{
    $permissions = Permission::get();
    $role = Role::findOrFail($roleId);

    return Inertia::render('Roles/AddPermission', [
        'role' => $role,
    ]);
}

public function givePermissionToRole(Request $request, $roleId)
{
    $request->validate([
        'permission' => 'required|array', // Pastikan permission adalah array
        'permission.*' => 'exists:permissions,name' // Validasi setiap item permission dalam array
    ]);

    $role = Role::findOrFail($roleId);
    $role->syncPermissions($request->permission);

    return redirect()->route('roles.AddPermission', ['roleId' => $roleId])->with('status', 'Success');
}
}
