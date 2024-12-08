
import { useEffect, useState } from 'react';
import PersonCard from '../pople/PersonCard'
import axios from "axios";
function CampDetails({idSelected}) {
  const [camp,setCamp] = useState(null);
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    const fetchCamp = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/camps/${idSelected.id}`); // Assuming you have this API endpoint
        
        // const disasterOptions = response.data.map((disaster) => ({
        //   label: disaster.name, // Adjust according to your data structure
        //   value: disaster._id,  // Assuming disaster has an _id field
        // }));
        setCamp(response.data.data); // Update the state with the fetched disasters
      } catch (error) {
        console.error("Error fetching disasters:", error);
      }
    };

    fetchCamp(); // Call fetch function
  }, [idSelected]); 

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/persons/camp/${idSelected.id}`);
        setPersons(response.data.data); // Set the fetched persons to the state
      } catch (err) {
        console.error(err);
      }
    };

    fetchPersons();
  }, [idSelected]);
  
  
  return (
    <div className="flex flex-row flex-1 border p-4">
    <div className="flex flex-col p-2 w-1/2 h-full border">
      <div className="flex flex-row gap-2 justify-center items-center p-2 h-14 w-full border">
        <p className="text-gray-500 text-sm">Disaster : </p>
        <p className="text-gray-500 text-sm font-mono ">
          {camp?.name}
        </p>
      </div>
      <div className="flex flex-1 flex-row w-full">
        <div className="flex w-1/2 h-full pr-1 py-1">
          <div className="flex flex-col border h-full w-full">
            <div className="flex flex-row h-8 gap-2 border-b p-1 items-center text-xs ml-2 text-gray-500">
              <p>Capacity :</p> <p> {camp?.capacity}</p>
            </div>
            <div className="flex flex-row h-8 gap-2 border-b p-1 items-center text-xs ml-2 text-gray-500">
              <p>People Accomodated :</p> <p>500</p>
            </div>
            <div className="flex flex-row h-8 gap-2 border-b p-1 items-center text-xs ml-2 text-gray-500">
              <p>Balence :</p> <p>500</p>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 h-full pl-1 py-1">
          <div className="flex flex-col border h-full w-full p-2">
            <div className="flex h-1/3 border-b items-center justify-center w-full text-sm text-gray-500">
              <p>Contact : </p>
              <p>{camp?.contact}</p>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex w-full justify-center text-xs text-gray-400">
                {" "}
                <p className="border-b">Location</p>
              </div>
              <div className="flex  w-full border-b text-xs ml-2 text-gray-400">
                <p>Lat :</p>
                <p>{camp?.lat}</p>
              </div>
              <div className="flex  w-full  text-xs ml-2 text-gray-400">
                <p>Lon :</p>
                <p>{camp?.lng}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col w-1/2 h-full border p-2 overflow-hidden">
    <div className="flex flex-col h-[200px] w-full overflow-scroll">

    {persons.map((person,index)=>{
          return ( <PersonCard key={index} person={person} />)
         })}
    </div>
     
    </div>
  </div>
  )
}

export default CampDetails