import './App.css';
// import { ImagesSliderDemo } from './components/ImagesSliderDemo';
import LoginPage from './pages/LoginPage';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import {initializeApp} from 'firebase/app'
import AuthRoute from './components/Auth/AuthRoute';
import { firebaseConfig } from './Firebase/firebase';

initializeApp(firebaseConfig);

const App = () => {
  

  return (
      <Routes>
        <Route path="/git-ClanCollApp" 
                element= { <Home/>} />
        <Route path="/git-ClanCollApp/login" element= {<LoginPage />} />
      </Routes>
  )
}

export default App
