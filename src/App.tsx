import './App.css';
// import { ImagesSliderDemo } from './components/ImagesSliderDemo';
import LoginPage from './pages/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from './Firebase/firebase'
import AuthRoute from './components/Auth/AuthRoute';

initializeApp(firebaseConfig);

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/git-ClanCollApp" 
                element= {
                <AuthRoute>
                            <Home/>
                </AuthRoute>
                        } 
        />
        <Route path="/git-ClanCollApp/login" element= {<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
