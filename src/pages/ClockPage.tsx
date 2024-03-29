import React from "react";
import Topnavbar from "../components/Navigation/Topnavibar"
import DigitalClock from '../components/ui/clock'
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "../components/ui/calender";

const Clock = () => {
    const navigate = useNavigate();
    const { clanId } = useParams();

    const handleNavigateBack = () => {
      navigate(`/git-ClanCollApp/Dashboard/${clanId}`); // Navigate back to the Clan Dashboard with the clanId
    };

    return (
        <div>
        <div className="flex flex-col h-full bg-secondary">
          <Topnavbar 
          // clanId={clanId}
          navigateBack={handleNavigateBack} />
          <main className="flex-1 overflow-y-auto px-6 py-4">
            <DigitalClock/>
          </main>
          <button onClick={handleNavigateBack} className="bg-primary">
            Go Back to Dashboard
          </button>
        </div>
        </div>
    );
}

export default Clock;
