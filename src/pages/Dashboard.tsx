

import DashboardGrid from '../components/DashboardGrid';
import Topnavbar from '../components/Navigation/Topnavibar';
import { useParams } from 'react-router-dom';
import { useClanContext } from '../components/Context/ClanContext';

export interface IHomeProps{}


const Dashboard = () => {
    // const { clanId, clanName } = useParams<{ clanId?: string, clanName?: string}>();
    const { selectedClanId, selectedClanName } = useClanContext();
   

    return (
        <>
            <Topnavbar/>
            {/* {clanId? <DashboardGrid clanId={clanId} clanName={clanName || "Default"}/> : <p>Clan ID is not provided</p>} */}
            {selectedClanId ? (
        <DashboardGrid clanId={selectedClanId} clanName={selectedClanName || 'Default'} />
      ) : (
        <p>Clan ID is not provided</p>
      )}
        </>
    )
}

export default Dashboard; 