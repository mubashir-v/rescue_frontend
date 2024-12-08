import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import Select for disaster dropdown
import customStyles from "../select/customStyle";

function CampForm({ latandlng }) {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    lat: latandlng.lat,
    lng: latandlng.lng,
    contact:"",
    capacity:"",
    disaster: "", // To store the selected disaster ID
  });

  const [disasters, setDisasters] = useState([]); // State to store disaster options

  // Fetch disasters from the API when the component mounts
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/disasters"); // Assuming you have this API endpoint
        
        // const disasterOptions = response.data.map((disaster) => ({
        //   label: disaster.name, // Adjust according to your data structure
        //   value: disaster._id,  // Assuming disaster has an _id field
        // }));

        setDisasters(response.data.data); // Update the state with the fetched disasters
      } catch (error) {
        console.error("Error fetching disasters:", error);
      }
    };

    fetchDisasters(); // Call fetch function
  }, []); // Empty dependency array to run only once on mount

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle disaster selection
  const handleDisasterChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      disaster: selectedOption ? selectedOption.value : "", // Update with selected disaster value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/camps", // Your API endpoint for creating a camp
        formData
      );
      console.log("Camp created:", response.data);
      // Optionally show a success message or handle response
    } catch (error) {
      console.error("Error creating camp:", error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  // Set lat and lng from parent component on mount
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lat: latandlng.lat,
      lng: latandlng.lng,
    }));
  }, [latandlng]);

  return (
    <div className="flex p-4 border h-60 overflow-scroll flex-col rounded w-full items-center">
      <p className="text-gray-400 border-b">Create Camp</p>
      <form className="flex flex-wrap gap-4 w-full">
        {/* Camp Name */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Camp Name</label>
          <input
            type="text"
            name="name"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Camp Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Place */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Place</label>
          <input
            type="text"
            name="place"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Place"
            value={formData.place}
            onChange={handleInputChange}
          />
        </div>
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Latitude</label>
          <input
            type="text"
            name="contact"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Latitude</label>
          <input
            type="text"
            name="capacity"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />
        </div>


        {/* Latitude */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Latitude</label>
          <input
            type="text"
            name="lat"
            className="flex w-full bg-transparent placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Latitude"
            value={formData.lat}
            readOnly
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
            readOnly
          />
        </div>

        {/* Disaster (Select Dropdown populated from API) */}
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Disaster</label>
          <Select
            name="disaster"
            styles={customStyles}
            getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
            options={disasters} // Now populated with fetched disasters
            onChange={handleDisasterChange} // Update disaster selection
            placeholder="Select Disaster"
          />
        </div>

        {/* Create Camp Button */}
        <div className="h-10 p-0 m-0 max-w-sm min-w-[100px]">
          <input
            type="button"
            className="flex w-full mt-6 bg-red-900 hover:bg-white hover:text-pink-900 text-white cursor-pointer placeholder:text-slate-400 text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            onClick={handleSubmit}
            value="Create Camp"
          />
        </div>
      </form>
    </div>
  );
}

export default CampForm;
