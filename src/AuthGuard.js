import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "_provider/AuthProvider";

const AuthGuard = (props) =>{
    const {currentUser} = useContext(AuthContext);
    // console.log("AuthGuard",currentUser);

    if(currentUser)
    {
        return props.children;
    }

    return <Redirect to='/auth/login' />;

}

export default AuthGuard;