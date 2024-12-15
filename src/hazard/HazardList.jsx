import React, { useEffect, useState } from "react";
import axios from "axios";
import DisasterForm from "../disaster/DisasterForm";
import HazardCard from "./HazardCard";

function HazardList({ latandlng }) {
  const [hazards, setHazards] = useState([]); // State to store the list of hazards
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch hazards from the API
  useEffect(() => {
    const fetchHazards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/disasters");
        setHazards(response.data.data); // Set the hazards data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hazards:", err);
        setError("Failed to fetch hazards.");
        setLoading(false);
      }
    };

    fetchHazards();
  }, []);

  return (
    <div className="flex w-full border p-2 flex-col">
      {/* Header */}
      <div className="flex w-full h-14 border items-center justify-center">
        <h3 className="text-gray-500">Hazards</h3>
      </div>

      {/* Hazard Cards */}
      <div className="flex w-full gap-1 items-center flex-col flex-1 py-2 overflow-scroll">
        {loading ? (
          <p className="text-gray-400">Loading hazards...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : hazards.length > 0 ? (
          hazards.map((hazard,index) => (
            <HazardCard key={hazard._id} index={index+1} hazard={hazard} />
          ))
        ) : (
          <p className="text-gray-400">No hazards found.</p>
        )}
      </div>

      {/* Disaster Form */}
      <div className="flex">
        <DisasterForm latandlng={latandlng} />
      </div>
    </div>
  );
}

export default HazardList;
