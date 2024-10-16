<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statusTypes = [
            [
                'name' => 'not started',
                'position' => 0
            ],
            [
                'name' => 'active',
                'position' => 1
            ],
            [
                'name' => 'closed',
                'position' => 2
            ]
        ];

        foreach ($statusTypes as $statusType) {
            DB::table('status_types')->insert([
                'name' => $statusType['name'],
                'position' => $statusType['position']
            ]);
        }
    }
}
