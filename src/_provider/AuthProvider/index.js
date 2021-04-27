import React, { useEffect, useState } from "react";
import app from "./base.js";
import CircularProgress from '@material-ui/core/CircularProgress';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {

      // console.log('AuthProvider',user);
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  
  if(pending){
    return (<div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'}}>
        <CircularProgress disableShrink />
      </div>)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const App = app;