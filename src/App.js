import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/pages/users";
import Main from "./components/pages/main";
import Login from "./components/pages/login";
import NavsBar from "./components/layouts/header/navbar/NavsBar";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppLoader from "./components/HOC/appLoader";
import ProtectedRoute from "./components/ui/users/protectedRoute";

const App = () => {
    return (
        <>
            <NavsBar />
            <AppLoader>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type" component={Login} />
                    <ProtectedRoute
                        path="/users/:id?/:edit?"
                        component={Users}
                    />

                    <Redirect to="/" />
                </Switch>
                <ToastContainer />
            </AppLoader>
        </>
    );
};

export default App;
