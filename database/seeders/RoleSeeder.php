<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Membuat peran (roles)
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);

        // Membuat izin (permissions)
        Permission::create(['name' => 'create post']);
        Permission::create(['name' => 'edit post']);
        Permission::create(['name' => 'delete post']);

        // Memberikan izin kepada peran
        Role::findByName('admin')->syncPermissions(['create post', 'edit post', 'delete post']);
        Role::findByName('user')->syncPermissions(['create post']);
    }
}
