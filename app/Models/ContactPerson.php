<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactPerson extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ContactPerson';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the primary key.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'contact_id';
    protected $fillable = [
        "sale_name",
        "sale_tel",
        "sale_email",
        "sale_manager_name",
        "sale_manager_tel",
        "sale_manager_email",
        "account_name",
        "account_tel",
        "account_email",
        "account_manager_name",
        "account_manager_tel",
        "account_manager_email",
        "managing_director_name",
        "managing_director_tel",
        "managing_director_email",
    ];
}
