/* eslint-disable indent */
import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localstorage.service";
import userService from "../service/user.service";
import { randomInt } from "../utils/randomInt";

const usersSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLogIn: false
    },
    reducers: {
        usersRequested(state) {
            state.isLoading = true;
        },
        usersReceved(state, { payload }) {
            state.entities = payload;
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
            state.auth = payload;
            state.isLoading = false;
        },
        authRequestFailed(state, { payload }) {
            state.error = payload;
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
    authRequestFailed
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
    } catch (e) {
        dispatch(authRequestFailed("Ошибка при загрузки данных - 'users'"));
        console.error(e);
    }
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
                    isLogIn: true,
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

export const getUsersState = () => (state) => state.user.entities;
export const getUsersLoading = () => (state) => state.user.isLoading;
export const getUsersError = () => (state) => state.user.error;
export const getAuth = () => (state) => state.user.auth;

export default usersReducer;
