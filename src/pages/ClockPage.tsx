import React from "react";
import Topnavbar from "../components/Navigation/Topnavibar"
import DigitalClock from '../components/ui/clock'

const Clock = () => {

    return (
        <div>
        {/* <img src={Journaling} className='absolute inset-0 w-full h-full object-cover z-[-20] opacity-100' alt="background" /> */}
        <div className="flex flex-col h-full bg-secondary">
          <Topnavbar/>
          <main className="flex-1 overflow-y-auto px-6 py-4">
        <DigitalClock/>
        
        </main>
        </div>
        </div>

    )
}

export default Clock;