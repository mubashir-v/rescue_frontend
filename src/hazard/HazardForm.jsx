import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Select from "react-select";
function HazardForm({ latandlng }) {
  const [formData, setFormData] = useState({
    type: "",
    place: "",
    latitude: latandlng.lat,
    longitude: latandlng.lng,
  });

  const handleSubmit = async () => {
   
    try {
      const response = await axios.post(
        "http://localhost:3000/api/hazards",
        formData
      );
      console.log("Hazard  created:", response.data);
      // Optionally show a success message or handle response
    } catch (error) {
      console.error("Error creating Hazard :", error);
      // Optionally handle error (e.g., show a message to the user)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      lat: latandlng.lat,
      lng: latandlng.lng,
    }));
  }, [latandlng]);

  return (
    <div className="flex p-4 border flex-1 flex-col rounded w-full items-center">
      <p className="text-gray-400 border-b"> Create Hazard</p>
      <form className="flex flex-wrap gap-4 w-full">
        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Type</label>
          {/* <label className="block mb-2 text-xs text-slate-600">Name</label> */}
          <input
            type="text"
            name="type"
            className="flex w-full bg-transparent placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Hazard Type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </div>

        <div className="h-12 p-0 m-0 max-w-sm min-w-[200px]">
          <label className="ml-2 text-[10px] text-slate-600">Place</label>
          {/* <label className="block mb-2 text-xs text-slate-600">Name</label> */}
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

        <div className="h-10 p-0  m-0 max-w-sm min-w-[100px]">
          <input
            type="button"
            className="flex w-full mt-6 bg-red-900 hover:bg-white hover:text-pink-900 text-white cursor-pointer placeholder:text-slate-400  text-xs border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              onClick={() => handleSubmit()}
            value={"Create Hazard"}
            // onChange={handleInputChange}
            // ref={lastInputRef}
          />
        </div>

        {/* <div className="h-12 p-0  m-0 max-w-sm min-w-[80px]">
            <label className="ml-2 text-[10px] text-slate-600">Side</label>
            <Select
              menuPosition="fixed"
            //   styles={customStyles}
            //   options={sides}
            //   ref={pageSidesRef}
              openMenuOnFocus={true}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Side"
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
            //   value={newQuotationItem.side}
            //   onChange={handleSideChange}
            //   onKeyDown={handleKeyDown}
            />
          </div> */}
      </form>
    </div>
  );
}

export default HazardForm;
