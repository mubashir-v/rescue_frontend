import React from "react";
import hazardWarn from "../assets/png/hazard.png";
import axios from "axios";

function HazardCard({ hazard, index }) {
  const handleMarkAsDisaster = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/disasters/${hazard._id}/mark-as-disaster`
      );
      alert(response.data.message);
      // Optionally, refresh the list of hazards here
    } catch (error) {
      console.error("Error marking disaster:", error);
      alert("Failed to mark hazard as disaster.");
    }
  };

  return (
    <div className="flex bg-slate-50 w-full h-20 border p-2 rounded">
      <div className="flex bg-white w-2/12 border rounded h-full py-3 px-2">
        <img src={hazardWarn} alt="Hazard" />
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex w-full border-b items-center justify-center h-1/2">
          <p className="text-sm font-mono text-gray-600">
            #Hazard No {index} {hazard.name}
          </p>
        </div>
        <div className="flex w-full flex-1 items-center justify-center flex-row">
          <div className="flex">
            <p className="text-xs text-gray-500">Place: {hazard.place}</p>
          </div>
          <div className="flex">
            <p className="text-xs text-gray-500">Type: {hazard.type}</p>
          </div>
          <div className="flex">
            <p className="text-xs text-gray-500">
              Intensity: {hazard.intensity}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-red-500 text-white text-xs px-3 py- rounded hover:bg-red-600"
            onClick={handleMarkAsDisaster}
          >
            Mark as Disaster
          </button>
        </div>
      </div>
    </div>
  );
}

export default HazardCard;
