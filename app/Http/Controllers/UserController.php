<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'regex:/^[^0-9]+$/'],
            'email' => ['required', 'unique:App\Models\User,email'],
            'phone' => ['required', 'numeric', 'digits_between:10,15'],
            'password' => ['required', 'min:6', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'],
            'confPassword' => ['required', 'same:password'],
        ], [
            'name.required' => 'Kolom nama harus diisi.',
            'name.regex' => 'Nama tidak boleh mengandung angka.',
            'email.required' => 'Kolom email harus diisi.',
            'email.unique' => 'Email sudah digunakan.',
            'phone.required' => 'Kolom nomor telepon harus diisi.',
            'phone.numeric' => 'Nomor telepon harus berupa angka.',
            'phone.digits_between' => 'Panjang nomor telepon harus antara :min dan :max digit.',
            'password.required' => 'Kolom password harus diisi.',
            'password.min' => 'Password minimal harus terdiri dari :min karakter.',
            'password.regex' => 'Password harus mengandung huruf kecil, huruf besar dan angka.',
            'confPassword.required' => 'Kolom konfirmasi password harus diisi.',
            'confPassword.same' => 'Konfirmasi password tidak sesuai dengan password.',
        ]);

        $validatedData["password"] = Hash::make($validatedData["password"]);

        User::create($validatedData);

        return redirect('/users')->with('message', 'New User has been Added');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $rules = [
            'name' => ['required', 'regex:/^[^0-9]+$/'],
            'phone' => ['required', 'numeric', 'digits_between:10,15'],
        ];

        if ($request->email !== $user->email) {
            $rules["email"] = ['required', 'unique:users'];
        }

        if ($request->password === null) {
            // Jika password tidak diubah, gunakan password yang ada di database
            $request->merge(['password' => $user->password]);
        } else {
            // Jika password diubah, atur password baru dan tambahkan aturan validasi
            $rules["password"] = ['required', 'min:6', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'];
            $request->merge(['password' => Hash::make($request->password)]);
        }



        $message = [
            'name.required' => 'Kolom nama harus diisi.',
            'name.regex' => 'Nama tidak boleh mengandung angka.',
            'email.required' => 'Kolom email harus diisi.',
            'email.unique' => 'Email sudah digunakan.',
            'phone.required' => 'Kolom nomor telepon harus diisi.',
            'phone.numeric' => 'Nomor telepon harus berupa angka.',
            'phone.digits_between' => 'Panjang nomor telepon harus antara :min dan :max digit.',
            'password.required' => 'Kolom password harus diisi.',
            'password.min' => 'Password minimal harus terdiri dari :min karakter.',
            'password.regex' => 'Password harus mengandung huruf kecil, huruf besar dan angka.',
        ];

        $validatedData = $request->validate($rules, $message);

        User::where('id', $user->id)->update($validatedData);

        return redirect('/users')->with('message', 'User has been Updated');
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
