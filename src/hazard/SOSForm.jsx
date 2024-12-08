import React, { useState, useEffect } from 'react';
import Select from "react-select";
import axios from 'axios'; // Import axios
import customStyles from '../select/customStyle';

function SOSForm({ latandlng }) {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    lat: latandlng.lat,
    lng: latandlng.lng,
    disaster: '',
  });

  const [disasters, setDisasters] = useState([]); // State for disasters

  // Fetch disasters from the backend
  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/disasters'); // Assuming this is the endpoint for disasters
        setDisasters(response.data); // Assuming the data returned is an array of disaster objects
      } catch (error) {
        console.error('Error fetching disasters:', error);
      }
    };

    fetchDisasters();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDisasterChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      disaster: selectedOption ? selectedOption.name : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.lat=latandlng.lat;
      formData.lng=latandlng.lng;
      const response = await axios.post('http://localhost:3000/api/persons', formData);
      console.log('SOS alert created:', response.data);
      // Optionally show a success message or handle response
    } catch (error) {
      console.error('Error creating SOS alert:', error);
      // Optionally handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="flex p-4 border flex-1 flex-col rounded w-full items-center">
      <p className="text-gray-400 border-b">Create SOS Alert</p>
      <form className="flex flex-wrap gap-4 w-full" onSubmit={handleSubmit}>
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Name</label>
          <input
            type="text"
            name="name"
            className="flex w-full bg-transparent placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Person Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Place</label>
          <input
            type="text"
            name="place"
            className="flex w-full bg-transparent placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Place"
            value={formData.place}
            onChange={handleInputChange}
          />
        </div>

        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Latitude</label>
          <input
            type="text"
            name="lat"
            className="flex w-full bg-transparent placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Latitude"
            value={latandlng.lat}
            onChange={handleInputChange}
          />
        </div>

        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Longitude</label>
          <input
            type="text"
            name="lng"
            className="flex w-full bg-transparent placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Longitude"
            value={latandlng.lng}
            onChange={handleInputChange}
          />
        </div>

        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Disaster</label>
          <Select
            menuPosition="fixed"
            styles={customStyles}
            openMenuOnFocus={true}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id} // Use _id as value
            options={disasters} // Pass disasters fetched from the API
            placeholder="Select Disaster"
            onChange={handleDisasterChange}
          />
        </div>

        <div className="h-10 p-0 m-0 max-w-sm min-w-[100px]">
          <input
            type="submit"
            className="flex w-full mt-6 bg-red-900 hover:bg-white hover:text-pink-900 text-white cursor-pointer placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value="Create SOS"
          />
        </div>
      </form>
    </div>
  );
}

export default SOSForm;
