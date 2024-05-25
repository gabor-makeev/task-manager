<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tasks')->insert([
            'name' => 'Some task with open status',
            'description' => 'test',
            'status_id' => '1',
            'user_id' => '1'
        ]);
        DB::table('tasks')->insert([
            'name' => 'Some task with closed status',
            'description' => 'test',
            'status_id' => '2',
            'user_id' => '1'
        ]);
    }
}
