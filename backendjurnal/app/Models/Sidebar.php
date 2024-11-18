<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sidebar extends Model
{
    use HasFactory;
    protected $table = 'sidebar';
    public $timestamps = false;
    protected $fillable = [
        'sidebar_id',
        'label',
        'to_path',
        'icon'
    ];
}
