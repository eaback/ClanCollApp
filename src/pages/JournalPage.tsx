import React from "react";
import JournalApp from "../components/JournalApp";
import Topnavbar from "../components/Navigation/Topnavibar"
import Journaling from "../assets/Journaling.jpg"
import { useNavigate, useParams } from "react-router-dom";

const JournalPage = () => {
  const navigate = useNavigate();
    const { clanId } = useParams();

    const handleNavigateBack = () => {
      navigate(`/git-ClanCollApp/Dashboard/${clanId}`); // Navigate back to the Clan Dashboard with the clanId
    };

    return (
        <div>
        <img src={Journaling} className='absolute inset-0 w-full h-full object-cover z-[-20] opacity-100' alt="background" />
        <div className="flex flex-col h-full bg-secondary">
          {/* <header className="bg-primary text-tertiary py-4 px-6">
            <h1 className="text-2xl font-bold">To-Do Page</h1>
          </header> */}
          <Topnavbar 
          // clanId={clanId}
          navigateBack={handleNavigateBack} />
          <main className="flex-1 overflow-y-auto px-6 py-4">
        <JournalApp/>
        
        </main>
        </div>
        </div>
      );
    };

export default JournalPage;