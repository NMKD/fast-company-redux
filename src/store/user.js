/* eslint-disable semi */
/* eslint-disable indent */
import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localstorage.service";
import userService from "../service/user.service";
import { randomInt } from "../utils/randomInt";
import history from "../utils/history";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: false,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        usersReceved(state, { payload }) {
            state.entities = payload;
            state.dataLoaded = true;
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
            state.error = null;
        },
        authRequestSuccess(state, { payload }) {
            state.auth = payload;
            state.isLoggedIn = true;
        },
        authRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        },

        userLoggedOut(state) {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
        },
        userUpdatedSuccess(state, { payload }) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            const i = state.entities.findIndex((u) => u._id === payload._id);
            state.entities[i] = payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
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
    userLoggedOut,
    userUpdatedSuccess,
    userCreated
} = usersSlice.actions;

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { data } = await userService.fetchAll();
        dispatch(usersReceved(data.content));
    } catch (e) {
        dispatch(usersRequestFailed(e.message));
        console.error(e);
    }
};

export const onToogleBookmark = (id) => (dispatch, getState) => {
    dispatch(toogleBookmark(id));
};

// Auth
const createUser = (payload) => async (dispatch, getState) => {
    try {
        const { data } = await userService.create(payload);
        dispatch(userCreated(data.content));
        history.push("/users");
    } catch (e) {
        dispatch(authRequestFailed(e.message));
        console.error(e);
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
            dispatch(authRequestSuccess({ userId: data.localId }));
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
            const err = e.response.data.error;
            dispatch(usersRequestFailed(err.message));
            console.error(e);
        }
    };

export const signIn =
    ({ email, password }) =>
    async (dispatch, getState) => {
        dispatch(authRequested());

        try {
            const { data } = await authService.login({ email, password });
            localStorageService.setToken(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            history.push("/");
        } catch (e) {
            const err = e.response.data.error;
            if (err.code === 400) {
                const errorMsg = generateAuthError(err.message);
                dispatch(authRequestFailed(errorMsg));
            } else {
                dispatch(authRequestFailed(err.message));
            }
            console.error(e.response);
        }
    };

const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const updateCurrentUser = (payload) => async (dispatch, getState) => {
    dispatch(userUpdateRequested());
    try {
        const { data } = await userService.update(payload);
        dispatch(userUpdatedSuccess(data.content));
        history.push(`/users/${data.content._id}`);
    } catch (e) {
        console.error(e.response);
        dispatch(userUpdateFailed(e.message));
    }
};

export const getUsersState = () => (state) => state.user.entities;
export const getUsersLoading = () => (state) => state.user.isLoading;
export const getAuthErrors = () => (state) => state.user.error;
export const getUser = (id) => (state) =>
    state.user.entities
        ? state.user.entities.find((item) => item._id === id)
        : null;
export const getCurrentUser = () => (state) => {
    return state.user.entities
        ? state.user.entities.find((u) => u._id === state.user.auth?.userId)
        : null;
};
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;

export default usersReducer;
