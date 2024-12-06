import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Showmodel = () => {
    // Use base URL dynamically
    const baseURL =
        process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_API_BASE_URL
            : "/api";

    const [cars, setCars] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const response = await fetch(`${baseURL}/cars`);
            if (!response.ok) {
                alert(`HTTP error! status: ${response.status}`);
                return;
            }

            const result = await response.json();
            console.log('res', result)
            console.log("Cars:", result);
            setCars(result); // Assume you have a state variable to store cars
        } catch (error) {
            console.error("Error fetching cars:", error.message);
        }
    };

    const handleCreateCar = () => {
        navigate('/create-car');
    }

    const deleteCar = async (carId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this car?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${baseURL}/cars/${carId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                alert(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            const result = await response.json();
            console.log("Delete response:", result);
            alert("Car deleted successfully");

            // Refresh the car list
            getData(); // Assuming `getData` fetches the updated list of cars
        } catch (error) {
            console.error("Error deleting car:", error.message);
            alert("Error deleting car:", error.message);
        }
    };


    const goToEditPage = (cars) => {
        console.log('car', cars)
        // Navigate to the edit page and pass the car data via the state
        navigate('/edit-car', { state: { carData: cars } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 p-6">
            <div className="w-full max-w-5xl mx-auto">
                {/* <!-- Banner Section --> */}
                <div className="bg-blue-500 text-white rounded-lg shadow-lg p-8 mb-8">
                    <h1 className="text-4xl font-bold mb-2">All Autos</h1>
                    <p className="text-lg mb-4">Welcome to our autos</p>
                    <button
                        className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        onClick={handleCreateCar}
                    >
                        Create a New Model
                    </button>
                </div>
                <div className='flex flex-row  flex-wrap '>
                    {cars && cars.map((car) => (
                        <div key={car.id} className="w-[300px]  mr-[20px] mb-[30px]">
                            <div className="bg-white relative h-[380px] rounded-lg shadow-lg overflow-hidden">
                                <img
                                    src={car.image}
                                    alt="Car Image"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-blue-700 mb-2">{car.model}</h2>
                                    <p className="text-gray-600">{car.description}</p>

                                    {/* Buttons for Edit and Delete */}

                                    <div className="absolute bottom-4 left-4 right-4 flex space-x-4">
                                        <button
                                            onClick={() => goToEditPage(car)}
                                            className="flex-1 bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteCar(car.id)}
                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>




            </div>
        </div>


    )
}

export default Showmodel