import React from "react";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/pages/users";
import Main from "./components/pages/main";
import Login from "./components/pages/login";
import NavsBar from "./components/layouts/header/navbar/NavsBar";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppLoader from "./components/HOC/appLoader";

const App = () => {
    return (
        <>
            <NavsBar />
            <AppLoader>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type" component={Login} />
                    <Route path="/users/:id?/:edit?" component={Users} />
                </Switch>
                <ToastContainer />
            </AppLoader>
        </>
    );
};

export default App;
