
import { useEffect, useState } from 'react'
import axios from "axios";
import CampCard from './CampCard'
import CampForm from './CampForm'

function CampList({latandlng,setMapCenter,setIdSelected}) {
const [camps,setCamps] = useState([]);
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/camps"); // Assuming you have this API endpoint
        
        // const disasterOptions = response.data.map((disaster) => ({
        //   label: disaster.name, // Adjust according to your data structure
        //   value: disaster._id,  // Assuming disaster has an _id field
        // }));
      
        setCamps(response.data.data); // Update the state with the fetched disasters
      } catch (error) {
        console.error("Error fetching disasters:", error);
      }
    };

    fetchCamps(); // Call fetch function
  }, []); 
  
  return (
    <div className="flex w-full border p-2 flex-col ">
    <div className="flex w-full h-14  border items-center justify-center">
      <h3 className="text-gray-500">Camps</h3>
    </div>
    <div className="flex w-full gap-1 items-center flex-col  flex-1 py-2 overflow-scroll">

      {camps.map((camp,index)=>{
        return (<CampCard key={index} camp={camp} index={index} setMapCenter={setMapCenter} setIdSelected={setIdSelected}/>)
      })}
      
    </div>
    <div className='flex'>
      <CampForm latandlng={latandlng} />
    </div>
  </div>
  )
}

export default CampList