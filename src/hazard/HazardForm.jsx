import React, { useEffect, useState } from "react";
import axios from "axios";

function IncidentForm({ latandlng }) {
  const userType = JSON.parse(localStorage.getItem("userType")).userType;
  const [formData, setFormData] = useState({
    title: "", // Incident title
    description: "", // Incident description
    severity: "", // Severity level
    lat: latandlng.lat,
    lng: latandlng.lng,
    date: "", // Date of the incident
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
        "http://localhost:3000/api/hazard", // Updated API endpoint for incidents
        formData
      );
      console.log("Incident created:", response.data);
      // Optionally show a success message or handle response
    } catch (error) {
      console.error("Error creating incident:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
        <div className="flex p-4 border flex-1 flex-col rounded w-full items-center">
          <p className="text-gray-400 border-b">Create Incident</p>
          <form className="flex flex-wrap gap-4 w-full">
            {/* Incident Title */}
            <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Incident Title</label>
              <input
                type="text"
                name="name"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Incident Title"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Type</label>
              <input
                type="text"
                name="type"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Type (Flood)"
                value={formData.type}
                onChange={handleInputChange}
              />
            </div>

            <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Place</label>
              <input
                type="text"
                name="address"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Place"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Intencity </label>
              <input
                type="text"
                name="intencity"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Intencity"
                value={formData.intencity}
                onChange={handleInputChange}
              />
            </div>

            {/* Incident Description */}
            {/* <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Description</label>
              <textarea
                name="description"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Incident Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div> */}

            {/* Severity Level */}
            {/* <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Severity</label>
              <input
                type="text"
                name="severity"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Severity Level"
                value={formData.severity}
                onChange={handleInputChange}
              />
            </div> */}

            {/* Latitude */}
            <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Latitude</label>
              <input
                type="text"
                name="lat"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Latitude"
                value={formData.lat}
                onChange={handleInputChange}
              />
            </div>

            {/* Longitude */}
            <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Longitude</label>
              <input
                type="text"
                name="lng"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Longitude"
                value={formData.lng}
                onChange={handleInputChange}
              />
            </div>

            {/* Incident Date */}
            {/* <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
              <label className="ml-2 text-[10px] text-slate-600">Date</label>
              <input
                type="date"
                name="date"
                className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div> */}

            {/* Submit Button */}
            <div className="h-10 p-0 m-0 max-w-sm min-w-[100px]">
              <input
                type="button"
                className="flex w-full mt-6 bg-blue-900 hover:bg-white hover:text-blue-900 text-white cursor-pointer placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                onClick={handleSubmit}
                value="Create Incident"
              />
            </div>
          </form>
        </div>
  );
}

export default IncidentForm;
