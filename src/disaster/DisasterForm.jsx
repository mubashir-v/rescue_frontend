import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios

function DisasterForm({latandlng}) {
  const [formData, setFormData] = useState({
    name: "", // Disaster name
    description: "", // Disaster description
    date: "", // Date of the disaster
    lat: latandlng.lat,
    lng: latandlng.lng,
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lat: latandlng.lat,
      lng: latandlng.lng,
    }));
  }, [latandlng]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/disasters", // API endpoint to create disaster
        formData
      );
      console.log("Disaster created:", response.data);
      // Optionally show a success message or handle response
    } catch (error) {
      console.error("Error creating disaster:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex p-4 border flex-1 flex-col rounded w-full items-center">
      <p className="text-gray-400 border-b">Create Disaster</p>
      <form className="flex flex-wrap gap-4 w-full">
        {/* Disaster Name */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Disaster Name</label>
          <input
            type="text"
            name="name"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Disaster Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Disaster Description */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Description</label>
          <textarea
            name="description"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Disaster Description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Latitude</label>
          {/* <label className="block mb-2 text-xs text-slate-600">Name</label> */}
          <input
            type="text"
            name="lat"
            className="flex w-full bg-transparent placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Latitude"
            value={formData.lat}
            onChange={handleInputChange}
          />
        </div>

        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Longitude</label>
          {/* <label className="block mb-2 text-xs text-slate-600">Name</label> */}
          <input
            type="text"
            name="lng"
            className="flex w-full bg-transparent placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Longitude"
            value={formData.lng}
            onChange={handleInputChange}
          />
        </div>


        {/* Disaster Date */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Date</label>
          <input
            type="date"
            name="date"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit Button */}
        <div className="h-10 p-0 m-0 max-w-sm min-w-[100px]">
          <input
            type="button"
            className="flex w-full mt-6 bg-red-900 hover:bg-white hover:text-pink-900 text-white cursor-pointer placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            onClick={handleSubmit}
            value="Create Disaster"
          />
        </div>
      </form>
    </div>
  );
}

export default DisasterForm;
