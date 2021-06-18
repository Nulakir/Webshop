<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class CustomerController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Create new Author.
     *
     * @return Illuminate\Http\Response
     */
    public function createCustomer(Request $request)
    {
        $rules=[
            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',   
            'adress' => 'required|max:255',
            'housenumber' => 'required|max:255',
            'zipcode' => 'required|max:255',
            'city' => 'required|max:255',
            'emailadress' => 'required|max:255',              
        ];
        $this->validate($request, $rules); 
        $customer = Customer::create($request->all()); 
        return response()->json($customer,201); 
    }

    
}
