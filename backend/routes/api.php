<?php

use App\Http\Controllers\CarsController;
use App\Http\Middleware\Cors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware([Cors::class])->group(function () {
    Route::get('/cars', [CarsController::class,'index'])->name('car.index');
    Route::post('/carCreate', [CarsController::class,'store'])->name('car.store');
    Route::get('/cars/{car}', [CarsController::class,'show'])->name('car.show');
    Route::post('/cars/{car}', [CarsController::class,'update'])->name('car.update');
    Route::delete('/cars/{car}', [CarsController::class,'destroy'])->name('car.destroy');
});
