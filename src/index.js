import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/createStore";
import history from "./utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
);

reportWebVitals();
