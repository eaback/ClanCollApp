import DashboardGrid from '../components/DashboardGrid';
import Topnavbar from '../components/Navigation/Topnavibar';
import { useNavigate, useParams } from 'react-router-dom';
import { useClanContext } from '../components/Context/ClanContext';

const Dashboard = () => {
    const { selectedClanId, selectedClanName } = useClanContext();
    const navigate = useNavigate();

    const handleNavigateBack = () => {
        if (selectedClanId) {
          navigate(`/git-ClanCollApp/Dashboard/${selectedClanId}`);
        }
      };

      return (
        <>
            <Topnavbar 
            // clanId={selectedClanId || undefined} 
            navigateBack={handleNavigateBack} />
            {selectedClanId ? (
                <DashboardGrid clanId={selectedClanId} clanName={selectedClanName || 'Default'} />
            ) : (
                <p>Clan ID is not provided</p>
            )}
        </>
    )
}

export default Dashboard;
