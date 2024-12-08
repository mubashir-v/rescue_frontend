
import campHome from "../assets/png/camp.png";
function CampCard({camp,index,setMapCenter,setIdSelected}) {
  const handleClick = (camp) =>{
    setMapCenter({lat:camp.lat,lng:camp.lng});
    setIdSelected({id:camp._id,object:"Camp"})
  }
  return (
    <div className="flex hover:bg-gray-200 hover:cursor-pointer bg-slate-50 w-full h-20 border p-2 rounded"
    onClick={()=>{handleClick(camp)}}
    >
    <div className="flex bg-white w-2/12 border rounded h-full py-3 px-2">
      <img src={campHome} />
    </div>
    <div className="flex flex-1 flex-col p-2">
      <div className="flex w-full border-b  items-center justify-center h-1/2">
        <p className="text-sm font-mono text-gray-600">
          #Camp NO {index+1} - {camp.name}
        </p>
      </div>
      <div className="flex w-full h-1/2 items-center justify-center flex-row gap-4">
        <div className="flex">
          <p className="text-xs text-gray-500">Contact : {camp.contact}</p>
        </div>
        <div className="flex">
          <p className="text-xs text-gray-500">Capacity : {camp.capacity}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CampCard