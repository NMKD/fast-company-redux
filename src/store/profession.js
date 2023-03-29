import { createSlice } from "@reduxjs/toolkit";
import professionService from "../service/profession.service";
import { isOutDate } from "../utils/funcOfDate";

const professionsSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested(state) {
            state.isLoading = true;
        },
        professionsReceved(state, { payload }) {
            state.entities = payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        }
    }
});

const { professionsRequested, professionsReceved, professionsRequestFailed } =
    professionsSlice.actions;
const { reducer: professionsReduce } = professionsSlice;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().profession;

    if (isOutDate(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { data } = await professionService.fetchAll();
            dispatch(professionsReceved(data.content));
        } catch (e) {
            dispatch(
                professionsRequestFailed(
                    "Ошибка при загрузки данных - 'professions'"
                )
            );
            console.error(e);
        }
    }
};

export const getProfession = (id) => (state) =>
    state.profession.entities !== null &&
    state.profession.entities.find((item) => item._id === id);

export const getProfessionsState = () => (state) => state.profession.entities;
export const getProfessionsLoading = () => (state) =>
    state.profession.isLoading;
export const getProfessionsError = () => (state) => state.profession.error;

export default professionsReduce;
