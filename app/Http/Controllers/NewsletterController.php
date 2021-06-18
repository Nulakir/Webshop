<?php

namespace App\Http\Controllers;

use App\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NewsletterController extends Controller
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
    public function createEmail(Request $request)
    {
        $rules=[
            'email' => 'required|max:255',             
        ];
        $this->validate($request, $rules); 
        $newsletter = Newsletter::create($request->all()); 
        return response()->json($newsletter,201); 
    }

    
}
