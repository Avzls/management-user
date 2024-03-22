<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('role-permission/permission/Index', [
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('role-permission/permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:permissions,name']
        ]);

        Permission::create($validatedData);

        return redirect('/permissions')->with('message', 'Add Permission Successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        return Inertia::render('role-permission/permission/Edit', [
            'permission' => $permission
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Permission $permission)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:permissions,name']
        ]);

        Permission::where('id', $permission->id)->update($validatedData);

        return redirect('/permissions')->with('message', 'Permission has been Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        Permission::destroy($permission->id);

        return redirect('/permissions')->with('message', 'Permission has been Deleted');
    }
}
