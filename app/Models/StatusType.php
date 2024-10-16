<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position'
    ];

    public function statuses(): HasMany
    {
        return $this->hasMany(Status::class);
    }
}
