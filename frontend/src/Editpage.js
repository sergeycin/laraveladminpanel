import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const EditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Use base URL dynamically
  const baseURL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_BASE_URL
      : "/api";

  const carData = location.state?.carData || {};

  const [formData, setFormData] = useState({
    model: carData?.model || "",
    description: carData?.description || "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(carData?.image || "");

  // Handle form input changes
  const changeHandler = (event) => {
    if (event.target.name === "image") {
      setFormData({ ...formData, image: event.target.files[0] });
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      return;
    }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("model", formData.model);
    data.append("description", formData.description);
    if (formData.image)
      data.append("image", formData.image);

    console.log('formdata', formData)

    try {

      const response = await fetch(`${baseURL}/cars/${carData.id}`, {
        method: "POST",
        body: data,
        headers: {
          // 'Content-Type': 'multipart/form-data' is not needed with fetch and FormData
        },
      });

      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`)
        throw new Error(`HTTP error! status: ${response.status}`);

      }

      const result = await response.json();
      console.log("Car succesfully changed:", result);
      alert('Car succesfully changed')
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleGoBack = () => {

    window.history.back(); // Navigates to the previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 p-6">
      {/* Go Back Arrow */}
      <div
        onClick={handleGoBack}
        className="absolute  left-[20px] flex items-center cursor-pointer text-blue-700 hover:text-blue-800 transition duration-300 mb-6 self-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-lg font-semibold">Go Back</span>
      </div>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Edit Car Model</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Current Image */}
          <div>
            <p className="text-gray-700 font-medium mb-2">Current Picture</p>
            <img
              src={previewImage}
              alt="Current Preview"
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Choose Image
            </label>
            <div className="relative w-full">
              <label
                htmlFor="image"
                className="block w-full bg-gray-100 border border-blue-300 text-blue-500 text-center py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {formData.image ? 'Image Selected' : 'Browse Files'}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={changeHandler}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>

          </div>

          {/* Model Name */}
          <div>
            <label htmlFor="model" className="block text-gray-700 font-medium mb-2">
              Model Name
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={changeHandler}
              placeholder="Model Name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={changeHandler}
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2 rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
