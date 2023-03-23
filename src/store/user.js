import { createSlice } from "@reduxjs/toolkit";
import userService from "../service/user.service";

const usersSlice = createSlice({
    name: "user",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
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
        }
    }
});

const { reducer: usersReducer } = usersSlice;
const { usersRequested, usersReceved, usersRequestFailed } = usersSlice.actions;

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

export const getUsersState = () => (state) => state.user.entities;
export const getUsersLoading = () => (state) => state.user.isLoading;
export const getUsersError = () => (state) => state.user.error;

export default usersReducer;
