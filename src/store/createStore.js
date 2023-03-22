import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReduce from "./profession";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    quality: qualitiesReducer,
    profession: professionsReduce
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
