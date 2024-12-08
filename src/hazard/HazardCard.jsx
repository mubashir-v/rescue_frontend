
import hazardWarn from "../assets/png/hazard.png";
function HazardCard() {
  return (
    <div className="flex bg-slate-50 w-full h-20 border p-2 rounded">
    <div className="flex bg-white w-2/12 border rounded h-full py-3 px-2">
      <img src={hazardWarn} />
    </div>
    <div className="flex flex-1 flex-col p-2">
      <div className="flex w-full border-b  items-center justify-center h-1/2">
        <p className="text-sm font-mono text-gray-600">
          #Hazard No 1
        </p>
      </div>
      <div className="flex w-full flex-1 items-center justify-center flex-row">
        <div className="flex">
          <p className="text-xs text-gray-500">Place : Vazhakkad</p>
        </div>
        <div className="flex">
          <p className="text-xs text-gray-500">Type : Flood</p>
        </div>
        <div className="flex">
          <p className="text-xs text-gray-500">Intencity : High</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HazardCard