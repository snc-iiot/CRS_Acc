<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'CompanyInformation';

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
    protected $primaryKey = 'company_id';
    protected $fillable = [
        "company_admin",
        "company_name",
        "number",
        "country",
        "province",
        "district",
        "sub_district",
        "post_code",
        "tel",
        "tax_payer",
        "website",
        "type_of_business",
    ];
}
