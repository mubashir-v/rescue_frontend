
import people from "../assets/png/people.png";
function PersonCard({person}) {
  return (
    <div className="flex bg-slate-50 w-full h-20 border p-2 rounded">
    <div className="flex bg-white w-2/12 border rounded h-full py-3 px-2 items-center justify-center">
      <img className="w-8 " src={people} />
    </div>
    <div className="flex flex-1 flex-col p-2">
      <div className="flex w-full border-b  items-center justify-center h-1/2">
        <p className="text-sm font-mono text-gray-600">
          {person.name}
        </p>
      </div>
      <div className="flex w-full h-1/2 items-center justify-center flex-row gap-4">
        <div className="flex">
          <p className="text-xs text-gray-500">Location : {person.lat} {" : "}  {person.lng}</p>
        </div>
        <div className="flex">
          {/* <p className="text-xs text-gray-500">Dessaster : Wayanad Landslide</p> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default PersonCard