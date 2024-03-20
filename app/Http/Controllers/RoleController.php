<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('role-permission/role/Index', [
            'roles' => Role::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('role-permission/role/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:roles,name']
        ]);

        Role::create($validatedData);

        return redirect('/roles')->with('message', 'Add Role Successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return Inertia::render('role-permission/role/Edit', [
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:roles,name']
        ]);

        Role::where('id', $role->id)->update($validatedData);

        return redirect('/roles')->with('message', 'Role has been Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Role::destroy($role->id);

        return redirect('/roles')->with('message', 'Role has been Deleted');
    }

    public function addPermissionToRole($roleId)
    {
        $assignedPermissions = [];

        $role = Role::findOrFail($roleId);

        $roleWithPermission = $role->permissions->toarray();

        foreach ($roleWithPermission as $e) {
            $assignedPermissions[] = $e["name"];
        }

        $permissions = Permission::get();

        $rolePermissions = DB::table('role_has_permissions')
            ->where('role_has_permissions.role_id', $role->id)
            ->pluck('role_has_permissions.permission_id')
            ->all();

        return Inertia::render('role-permission/role/AddPermissions', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions,
            'assignedPermissions' => $assignedPermissions
        ]);
    }

    public function givePermissionToRole(Request $request, $roleId)
    {
        $validatedData = $request->validate([
            'permission.*' => ['required']
        ]);

        $role = Role::findOrFail($roleId);

        $role->syncPermissions($validatedData);

        return redirect('/roles')->with('message', 'Permissions Added to Role');
    }
}
