<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['not started', 'active', 'closed'])->default('active');
            $table->enum('color', ['purple', 'blue', 'yellow', 'orange', 'red', 'gray', 'green'])->default('blue');
            $table->tinyInteger('position');
            $table->foreignIdFor(User::class);
            $table->timestamps();
            $table->unique(['type', 'position', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statuses');
    }
};
