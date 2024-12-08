import { useEffect, useState } from "react";
import PersonCard from "../pople/PersonCard";
import CampCard from "./CampCard";
import { FaCircleArrowRight } from "react-icons/fa6";
import axios from "axios";

function MoveToCampForm({ setMapCenter, setIdSelected }) {
  const [persons, setPersons] = useState([]);
  const [selectedCampId, setSelectedCampId] = useState(null);
  const [selectedPersons, setSelectedPersons] = useState([]);
  
  // Handle click for selecting persons
  const handlePersonClick = (index) => {
    const updatedPersons = [...persons];
    const person = updatedPersons[index];
    const updatedPerson = {
      ...person,
      selected: !person.selected, // Toggle the "selected" field
    };

    updatedPersons[index] = updatedPerson;
    setPersons(updatedPersons);

    if (updatedPerson.selected) {
      // Add to selectedPersons when selected
      setSelectedPersons((prev) => [...prev, person._id]);
    } else {
      // Remove from selectedPersons when deselected
      setSelectedPersons((prev) =>
        prev.filter((id) => id !== person._id)
      );
    }
  };

  // Handle click for selecting camps
  const handleCampClick = (index) => {
    const updatedCamps = camps.map((camp, idx) => {
      if (idx === index) {
        return { ...camp, selected: true };
      } else {
        return { ...camp, selected: false };
      }
    });

    setCamps(updatedCamps);
    setSelectedCampId(camps[index]._id);
  };

  // Fetch persons with no camp assigned
  useEffect(() => {
    const fetchPersons = async () => {
      const response = await axios.get("http://localhost:3000/api/person/without-camp");
      setPersons(response.data.data);
    };

    fetchPersons();
  }, []);

  // Fetch camps
  const [camps, setCamps] = useState([]);
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/camps");
        setCamps(response.data.data);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };

    fetchCamps();
  }, []);

  // Handle form submission (send POST request with selected persons and camp)
  const handleSubmit = async () => {
    if (!selectedCampId || selectedPersons.length === 0) {
      alert("Please select a camp and at least one person.");
      return;
    }

    const data = {
      campId: selectedCampId,
      personIds: selectedPersons,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/move-persons-to-camp", data);
      console.log("Response from backend:", response.data);
      // Optionally handle the response here (e.g., show success message)
    } catch (error) {
      console.error("Error moving persons to camp:", error);
      // Optionally handle the error (e.g., show error message)
    }
  };

  return (
    <div className="flex flex-row flex-1 border p-2">
      {/* Persons List */}
      <div className="flex flex-col w-5/12 h-full px-2 overflow-hidden">
        <div className="flex flex-col h-[200px] gap-1 w-full mt-2 overflow-scroll">
          {persons.map((person, index) => {
            return (
              <div
                className={`${person.selected ? "border border-green-700" : ""}`}
                key={index}
                onClick={() => handlePersonClick(index)}
              >
                <PersonCard key={index} person={person} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Camp List */}
      <div className="flex h-full w-2/12 items-center justify-center"   onClick={handleSubmit}>
        <div className="flex flex-col w-full items-center">
          <FaCircleArrowRight className="text-xl text-green-800 cursor-pointer" />
          <p className="text-[10px] text-gray-400">Move to Camp</p>
        </div>
      </div>

      <div className="flex flex-col w-5/12 h-full px-2 overflow-hidden">
        <div className="flex flex-col h-[200px] gap-1 w-full mt-2 overflow-scroll">
          {camps.map((camp, index) => {
            return (
              <div
                key={index}
                onClick={() => handleCampClick(index)}
                className={`${camp.selected ? "border border-green-700" : ""}`}
              >
                <CampCard
                  key={index}
                  camp={camp}
                  index={index}
                  setMapCenter={setMapCenter}
                  setIdSelected={setIdSelected}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
    
    </div>
  );
}

export default MoveToCampForm;
