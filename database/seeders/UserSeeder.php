<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Membuat pengguna
        $adminUser = User::create([
            'name' => 'admin123',
            'email' => 'admin@gmail.com',
            'phone' => '0812345678',
            'password' => Hash::make('qqlolz120'),
        ]);

        // Menetapkan role 'admin' kepada pengguna
        $adminRole = Role::where('name', 'admin')->first();
        $adminUser->assignRole($adminRole);

        // Membuat pengguna dengan role 'user'
        User::factory(2)->create()->each(function ($user) {
            $user->assignRole('user');
        });
    }
}
