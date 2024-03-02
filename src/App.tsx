import './App.css';
// import { ImagesSliderDemo } from './components/ImagesSliderDemo';
import LoginPage from './pages/LoginPage';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import {initializeApp} from 'firebase/app'
import AuthRoute from './components/Auth/AuthRoute';
import { firebaseConfig } from './Firebase/firebase';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';

initializeApp(firebaseConfig);

const App = () => {
  

  return (
    <ProfilePage/>
      // <Routes>
      //   {/* <Route path="/git-ClanCollApp"  */}
      //           {/* // element= { <Home/>} /> */}
      //   {/* <Route path="/git-ClanCollApp/login" element= {<LoginPage />} /> */}
      //   {/* <Route path="/git-ClanCollApp/signup" element= {<SignUpPage />} /> */}
      // </Routes>
  )
}

export default App
