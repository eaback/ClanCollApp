import './App.css';
// import { ImagesSliderDemo } from './components/ImagesSliderDemo';
import LoginPage from './pages/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import {initializeApp} from 'firebase/app'
import AuthRoute from './components/Auth/AuthRoute';
import { firebaseConfig } from './Firebase/firebase';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard'

initializeApp(firebaseConfig);

const App = () => {
  

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/git-ClanCollApp"
                element= { <Home/>} />
        <Route path="/git-ClanCollApp/login" element= {<LoginPage />} />
        <Route path="/git-ClanCollApp/signup" element= {<SignUpPage />} />
        <Route path="/git-ClanCollApp/Profile" element= {<ProfilePage/>} />
        <Route path="/git-ClanCollApp/Dashboard" element= {<Dashboard/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
