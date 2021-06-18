<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class newsletter extends Model
{

    protected $table = 'newsletter';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email'
    ];

}
