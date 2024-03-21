import './App.css';
// import { ImagesSliderDemo } from './components/ImagesSliderDemo';
import LoginPage from './pages/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import AuthRoute from './components/Auth/AuthRoute';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard';
import ClanMembers from './pages/ClanMembers';
import ToDoPage from './pages/ToDoPage';

import { firebaseConfig } from './Firebase/firebase';
import { initializeApp } from 'firebase/app';



initializeApp(firebaseConfig);

const App = () => {
  

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/git-ClanCollApp/login" element= {<LoginPage />} />
        <Route path="/git-ClanCollApp/signup" element= {<SignUpPage />} />
        {/* <AuthRoute> */}
            <Route path="/git-ClanCollApp"
                element= { <AuthRoute>
                              <Home/>
                          </AuthRoute>} />
            <Route path="/git-ClanCollApp/Profile" 
                element= {<AuthRoute>
                            <ProfilePage/>
                          </AuthRoute>} />
            <Route path="/git-ClanCollApp/Dashboard" 
                element= {<AuthRoute>
                            <Dashboard/>
                          </AuthRoute>} />
            <Route path="/git-ClanCollApp/ClanMembers" 
                element= {<AuthRoute>
                            <ClanMembers/>
                          </AuthRoute>} />
            <Route path="/git-ClanCollApp/ToDoPage" 
                element= {<AuthRoute>
                            <ToDoPage/>
                          </AuthRoute>} />
        {/* </AuthRoute> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App