import React, { useState, useEffect } from 'react';
// import './App.css'
import './App.scss'
import { useMediaQuery } from 'react-responsive';
import {  BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { authService } from './firebase/firebase.utility';

import HomePage from './pages/homepage/homepage.components';
import AuthPage from './pages/authpage/authpage.components';
import UserPage from './pages/userpage/userpage.components';
import PostingPage from './pages/postingpage/postingpage.components';


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
      {isMobile ? (
        <SideButton />
      ) : (
        <Header
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      )}
      
        <Switch>
          <Route exact path="/">
            <HomePage userObj={userObj} />
          </Route>

          <Route exact path="/user">
            <UserPage />
          </Route>

          <Route exact path="/posting">
            <PostingPage userObj={userObj} />
          </Route>

          <Route exact path="/auth">
            {userObj != null ? <Redirect to="/" /> : <AuthPage />}
          </Route>
        </Switch>
      
    </div>
  );
}

export default App;
