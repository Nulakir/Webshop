<?php

namespace App\Http\Controllers;

use App\Products;

class ProductController extends Controller
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

    //
        /**
     * return the list of Authors.
     *
     * @return Illuminate\Http\Response
     */
    public function showProducts()
    {
        $products= Products::all();

        return response()->json($products);
        //
    }

     /**
     * Show one Author.
     *
     * @return Illuminate\Http\Response
     */
    public function showProduct($productId)
    {
        $product = Products::findOrFail($productId);

        return response()->json($product);
    }
    /**
     * Create new Author.
     *
     * @return Illuminate\Http\Response
     */
    public function createProduct(Request $request)
    {
        $rules=[
            'name' => 'required|max:255',             
            'description' => 'required|max:255|',             
            'price' => 'required|max:255', 
        ];
        $this->validate($request, $rules); 
        $product = Products::create($request->all()); 
        return response()->json($product,201); 
    }
      /**      * Update an existing author      
       ** @return Illuminate\Http\Response    
         */    
         public function updateProduct(Request $request, $productId)    
         {        
         $rules = [            
            'name' => 'max:255',             
            'gender' => 'max:255|in:male,female',             
            'country' => 'max:255',         
        ]; 
 
        $this->validate($request, $rules); 
 
        $product = Products::findOrFail($productId); 
 
        $product->update($request->all()); 
 
        return response()->json($product, 200); 
 
     }
      /**      
       * Deleting an author     
       * @return Illuminate\Http\Response    
       */ 
 
    public function deleteProduct($productId)    
     {         
        $product = Products::findOrFail($productId); 
 
        $product->delete(); 
 
        return response()->json($product, 200);     } 
}
