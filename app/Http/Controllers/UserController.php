<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        // Membuat array kosong untuk menyimpan peran pengguna
        $roleNames = [];

        foreach ($users as $user) {
            // Mengambil peran pengguna dan menggabungkannya ke dalam array
            $roleNames[$user->id] = $user->getRoleNames()->toArray();
        }
        return Inertia::render('role-permission/user/Index', [
            'users' => $users,
            'roleNames' => $roleNames
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('role-permission/user/Create', [
            'roles' => Role::pluck('name')->all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'role' => ['required', 'array'],
            'password' => ['required', 'min:8', 'max:20'],
        ]);

        $validatedData["password"] = Hash::make($validatedData["password"]);

        $user = User::create($validatedData);

        $user->syncRoles($request->role);

        return redirect('/users')->with('message', 'New User has been Added with Role');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $userRoles = $user->roles->pluck('name')->all();

        return Inertia::render('role-permission/user/Edit', [
            'user' => $user,
            'roles' => Role::pluck('name')->all(),
            'userRoles' => $userRoles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'array'],
        ];

        if ($request->email !== $user->email) {
            $rules["email"] = ['required', 'unique:users'];
        }

        if ($request->password === null) {
            // Jika password tidak diubah, gunakan password yang ada di database
            $request->merge(['password' => $user->password]);
        } else {
            // Jika password diubah, atur password baru dan tambahkan aturan validasi
            $rules["password"] = ['required', 'min:8', 'max:20'];
            $request->merge(['password' => Hash::make($request->password)]);
        }

        $validatedData = $request->validate($rules);

        $user->update($validatedData);

        $user->syncRoles($request->role);

        return redirect('/users')->with('message', 'User Updated Successfully with Role');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        User::destroy($user->id);

        return redirect('/users')->with('message', 'User has been Deleted');
    }
}
