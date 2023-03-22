import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../service/quality.service";
import { isOutDate } from "../utils/funcOfDate";

const qualitiesSlice = createSlice({
    name: "quality",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested(state) {
            state.isLoading = true;
        },
        qualitiesReceved(state, { payload }) {
            state.entities = payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        }
    }
});

const { qualitiesRequested, qualitiesReceved, qualitiesRequestFailed } =
    qualitiesSlice.actions;

const { reducer: qualitiesReducer } = qualitiesSlice;

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().quality;
    if (isOutDate(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { data } = await qualityService.fetchAll();
            dispatch(qualitiesReceved(data.content));
        } catch (e) {
            dispatch(
                qualitiesRequestFailed(
                    "Ошибка при загрузки данных - 'качество'"
                )
            );
        }
    }
};

export const getQualitiesState = () => (state) => state.quality.entities;
export const getLoading = () => (state) => state.quality.isLoading;
export const getError = () => (state) => state.quality.error;

export default qualitiesReducer;
