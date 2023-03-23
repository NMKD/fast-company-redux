/* eslint-disable semi */
/* eslint-disable indent */
import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localstorage.service";
import userService from "../service/user.service";
import { randomInt } from "../utils/randomInt";
import history from "../utils/history";

const usersSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLogIn: false,
        dataStatus: false,
        currentUser: null
    },
    //
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersReceved(state, { payload }) {
            state.entities = payload;
            state.dataStatus = true;
            state.isLoading = false;
        },
        usersRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        },
        toogleBookmark(state, { payload }) {
            state.entities = state.entities.map((user) => ({
                ...user,
                bookmark:
                    user._id === payload
                        ? (user.bookmark = !user.bookmark)
                        : user.bookmark
            }));
        },
        authRequested(state) {
            state.isLoading = true;
        },
        authRequestSuccess(state, { payload }) {
            state.currentUser = payload;
            state.auth = payload._id;
            state.isLogIn = true;
            state.isLoading = false;
        },
        authRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        },
        logInRequested(state) {
            state.isLoading = true;
        },
        logInRequestSuccess(state, { payload }) {
            state.currentUser = payload;
            state.auth = payload._id;
            state.isLogIn = true;
            state.isLoading = false;
        },
        logInRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        },
        userLoggedOut(state) {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.currentUser = null;
            state.dataLoaded = false;
        },
        userUpdatedRequest(state, { payload }) {
            state.currentUser = payload;
            state.auth = payload._id;
            state.isLogIn = true;
            state.isLoading = false;
        }
    }
});

const { reducer: usersReducer } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFailed,
    toogleBookmark,
    authRequestSuccess,
    authRequested,
    authRequestFailed,
    logInRequestFailed,
    logInRequested,
    logInRequestSuccess,
    userLoggedOut,
    userUpdatedRequest
} = usersSlice.actions;

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { data } = await userService.fetchAll();
        dispatch(usersReceved(data.content));
    } catch (e) {
        dispatch(usersRequestFailed("Ошибка при загрузки данных - 'users'"));
        console.error(e);
    }
};

export const onToogleBookmark = (id) => (dispatch, getState) => {
    dispatch(toogleBookmark(id));
};

export const getUser = (id) => (state) =>
    state.user.entities
        ? state.user.entities.find((item) => item._id === id)
        : null;

// Auth
const createUser = (payload) => async (dispatch, getState) => {
    try {
        const { data } = await userService.create(payload);
        dispatch(authRequestSuccess(data.content));
        history.push("/users");
    } catch (e) {
        dispatch(authRequestFailed("Ошибка при загрузки данных - 'users'"));
        console.error(e);
    }
};

export const getAuthUser = (id) => async (dispatch, getState) => {
    try {
        const { data } = await userService.getAuth(id);
        dispatch(logInRequestSuccess(data.content));
        history.push("/");
    } catch (e) {
        if (e.response.statusText === "Unauthorized") {
            dispatch(logInRequestFailed("Пожалуйста пройдите регистрацию"));
        }
        console.error(e.response);
    }
};

export const onSignOut = () => (dispatch, getState) => {
    localStorageService.removeUserData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch, getState) => {
        dispatch(authRequested());
        try {
            const { data } = await authService.register({ email, password });
            localStorageService.setToken(data);
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    password,
                    completedMeetings: randomInt(0, 100),
                    rate: randomInt(1, 5),
                    ...rest
                })
            );
        } catch (e) {
            dispatch(
                usersRequestFailed(
                    "Ошибка при регистрации, попробуйте войти позже"
                )
            );
            console.error(e);
        }
    };

export const signIn =
    ({ email, password }) =>
    async (dispatch, getState) => {
        dispatch(logInRequested());
        try {
            const { data } = await authService.login({ email, password });
            localStorageService.setToken(data);
            dispatch(getAuthUser(data.localId));
        } catch (e) {
            const err = e.response.data.error;
            if (err.code === 400 && err.message === "EMAIL_EXISTS") {
                dispatch(logInRequestFailed("Email введен неверно"));
            } else if (err.code === 400 && err.message === "INVALID_PASSWORD") {
                dispatch(logInRequestFailed("Пароль введен неверно"));
            } else {
                console.error(e.response);
            }
        }
    };

export const updateCurrentUser = (payload) => async (dispatch, getState) => {
    dispatch(logInRequested());
    try {
        const { data } = await userService.update(payload);
        dispatch(userUpdatedRequest(data.content));
    } catch (e) {
        console.error(e.response);
        console.log("Ошибка при отправлении формы, попробуйте позже");
    }
};

export const getUsersState = () => (state) => state.user.entities;
export const getUsersError = () => (state) => state.user.error;
export const getUsersLoading = () => (state) => state.user.isLoading;
export const getCurrentUserId = () => (state) => state.user.auth;
export const getCurrentUser = () => (state) => state.user.currentUser;
export const getIsLoggedIn = () => (state) => state.user.isLogIn;
export const getDataStatus = () => (state) => state.user.dataStatus;

export default usersReducer;
