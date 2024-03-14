
import { ImagesSliderDemo } from '../components/ImagesSliderDemo';
import { getAuth, signOut } from 'firebase/auth';
import Topnavbar from '../components/Navigation/Topnavibar'

export interface IHomeProps{}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const auth = getAuth();

    return (
        <>
            <Topnavbar/>
            <ImagesSliderDemo/>
            
        </>
    )
}

export default Home;