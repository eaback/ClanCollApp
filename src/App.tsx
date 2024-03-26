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
import JournalPage from './pages/JournalPage';
import ClockPage  from './pages/ClockPage';

import { firebaseConfig } from './Firebase/firebase';
import { initializeApp } from 'firebase/app';
import {ClanProvider} from './components/Context/ClanContext'
// import ShoppinglistPage from './pages/ShoppinglistPage';



initializeApp(firebaseConfig);

const App = () => {
  

  return (
    <BrowserRouter>
    <ClanProvider>
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
            <Route path="/git-ClanCollApp/Dashboard/:clanId" 
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
            <Route path="/git-ClanCollApp/JournalPage" 
                element= {<AuthRoute>
                            <JournalPage/>
                          </AuthRoute>} />
            {/* <Route path="/git-ClanCollApp/ShoppinglistPage" 
                element= {<AuthRoute>
                            <ShoppinglistPage/>
                          </AuthRoute>} /> */}
            <Route path="/git-ClanCollApp/ClockPage" 
                element= {<AuthRoute>
                            <ClockPage/>
                          </AuthRoute>} />
        {/* </AuthRoute> */}
      </Routes>
    </ClanProvider>
    </BrowserRouter>
  )
}

export default App