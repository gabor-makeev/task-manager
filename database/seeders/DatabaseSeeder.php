<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            TaskSeeder::class,
            PrioritySeeder::class
        ]);

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $defaultStatuses = [
            [
                'name' => 'Open',
                'type' => 'not started',
                'color' => 'gray'
            ],
            [
                'name' => 'Closed',
                'type' => 'closed',
                'color' => 'green'
            ]
        ];

        foreach ($defaultStatuses as $defaultStatus) {
            Status::create([
                'name' => $defaultStatus['name'],
                'type' => $defaultStatus['type'],
                'user_id' => $user->id,
                'color' => $defaultStatus['color']
            ]);
        }
    }
}
