<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorities = [
            [
                'name' => 'super urgent',
                'value' => 6,
                'color' => 'purple',
            ],
            [
                'name' => 'urgent',
                'value' => 5,
                'color' => 'red',
            ],
            [
                'name' => 'very high',
                'value' => 4,
                'color' => 'orange',
            ],
            [
                'name' => 'high',
                'value' => 3,
                'color' => 'yellow',
            ],
            [
                'name' => 'normal',
                'value' => 2,
                'color' => 'blue',
            ],
            [
                'name' => 'low',
                'value' => 1,
                'color' => 'green',
            ],
            [
                'name' => 'very low',
                'value' => 0,
                'color' => 'gray',
            ],
        ];

        foreach ($priorities as $priority) {
            Priority::create([
                'name' => $priority['name'],
                'value' => $priority['value'],
                'color' => $priority['color']
            ]);
        }
    }
}
