<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Permissions/Index', [
            'permissions' => Permission::all()
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:permissions,name']
        ]);

        Permission::create($validatedData);

        return redirect('/permissions')->with('message', 'Permission Created Successfully');
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('Permissions/Edit', [
            'permission' => $permission
        ]);
    }

    public function update(Request $request, Permission $permission)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:permissions,name']
        ]);

        Permission::where('id', $permission->id)->update($validatedData);

        return redirect('/permissions')->with('message', 'Permission has been Updated');
    }

    public function destroy(Permission $permission)
    {
        Permission::destroy($permission->id);

        return redirect('/permissions')->with('message', 'Permission has been Deleted');
    }
}
