
import { Link } from 'react-router-dom';
import { ImagesSliderDemo } from '../components/ImagesSliderDemo';
import { getAuth, signOut } from 'firebase/auth';


export interface IHomeProps{}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const auth = getAuth();

    return (
        <div className="relative">
            <div className="absolute top-0 right-0 mt-8 mr-8 z-10">
                <Link to="/git-ClanCollApp/login" className="bg-primary text-tertiary border-2 border-secondary px-4 py-2 rounded-md mr-4">Login</Link>
                <Link to="/git-ClanCollApp/signup" className="bg-tertiary text-primary px-4 py-2 border-2 border-secondary rounded-md">Sign Up</Link>
            </div>
            <ImagesSliderDemo />
        </div>
    )
}

export default Home;