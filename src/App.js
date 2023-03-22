import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Users from "./components/pages/users";
import Main from "./components/pages/main";
import Login from "./components/pages/login";
import NavsBar from "./components/layouts/header/navbar/NavsBar";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/profession";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <NavsBar />
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type" component={Login} />
                    <Route path="/users/:id?/:edit?" component={Users} />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
