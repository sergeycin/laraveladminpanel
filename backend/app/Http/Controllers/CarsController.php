<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Cars::all()->map(function ($car) {
            $car->image = $car->image ? asset('storage/' . $car->image) : null;
            return $car;
        });

        return response()->json($cars, 200);
    }


    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "model" => "required|string",
            "description" => "required|string",
            "image" => "required|file|image|max:2048",
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $validatedData['image'] = $path; // Save the path in the database
        } else {
            return response()->json('Image was not  sendet', 422);
        }

        $car = Cars::create($validatedData);
        return response()->json($car, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cars $cars)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cars $cars)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'model' => 'string|string',
            'description' => 'string|string',
            'image' => 'nullable|file|image|max:2048', // Image is optional for update
        ]);
    
        // Find the car by its ID
        $car = Cars::findOrFail($id);
    
        // Update car details
        $car->model = $validatedData['model'];
        $car->description = $validatedData['description'];
    
        // Handle image update
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($car->image && Storage::disk('public')->exists($car->image)) {
                Storage::disk('public')->delete($car->image);
            }
    
            // Store new image
            $path = $request->file('image')->store('uploads', 'public');
            $car->image = $path; // Save new image path in the database
        }
    
        // Save the updated car information
        $car->save();
    
        // Return success response
        return response()->json(['message' => 'Car updated successfully', 'car' => $car], 200);

        // return response()->json(['message' => 'Car updated successfully', 'car' => $validatedData], 200);

       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cars $car)
    {
        // Delete the image file if it exists
        if ($car->image && Storage::disk('public')->exists($car->image)) {
            Storage::disk('public')->delete($car->image);
        }
    
        // Delete the car record from the database
        $car->delete();
    
        return response()->json(['message' => 'Car deleted successfully'], 200);
    }
    
    
}
