<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Alvin Malik',
            'email' => 'alvinmalik1111@gmail.com',
            'phone' => '0812345678',
            'password' => Hash::make('qqlolz120'),
        ]);

        User::factory(2)->create();
    }
}
