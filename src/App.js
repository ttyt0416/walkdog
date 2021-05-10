import React, { useState, useEffect } from 'react';
import './App.css'
import { useMediaQuery } from 'react-responsive';
// import { Switch, Route, Redirect } from 'react-router-dom';

import { authService } from './firebase/firebase.utility';

// import HomePage from './pages/homepage/homepage.components';
// import AuthPage from './pages/authpage/authpage.components';
// import UserPage from './pages/userpage/userpage.components';
// import PostingPage from './pages/postingpage/postingpage.components';


import SideButton from './components/sidebutton/sidebutton.components';
import Header from './components/header/header.components';


const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect (() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid
    });
  };
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)"
  });

  return (
  <div>
      {isMobile ? <SideButton /> : <Header refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />}
  </div>
  )
}

export default App;
