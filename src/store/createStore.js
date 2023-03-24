import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReduce from "./comments";
import professionsReduce from "./profession";
import qualitiesReducer from "./qualities";
import usersReducer from "./user";

const rootReducer = combineReducers({
    quality: qualitiesReducer,
    profession: professionsReduce,
    user: usersReducer,
    comments: commentsReduce
});

const store = configureStore({
    reducer: rootReducer
});

export default store;
