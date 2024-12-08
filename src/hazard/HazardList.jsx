
import DisasterForm from '../disaster/DisasterForm'
import HazardCard from './HazardCard'

function HazardList({latandlng}) {
  return (
    <div className="flex w-full border p-2 flex-col ">
    <div className="flex w-full h-14  border items-center justify-center">
      <h3 className="text-gray-500">Hazards</h3>
    </div>
    <div className="flex w-full gap-1 items-center flex-col  flex-1 py-2 overflow-scroll">
      <HazardCard />
    </div>
    <div className='flex'>
      <DisasterForm latandlng={latandlng}/>
    </div>
  </div>
  )
}

export default HazardList