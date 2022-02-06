
import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";




const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    }


    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;