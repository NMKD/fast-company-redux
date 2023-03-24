import { createSlice } from "@reduxjs/toolkit";
import commentService from "../service/coment.service";

const commentsSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested(state) {
            state.isLoading = true;
        },
        commentsReceved(state, { payload }) {
            state.entities = payload;
            state.isLoading = false;
        },
        commentsRequestFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        }
    }
});

const { commentsRequested, commentsReceved, commentsRequestFailed } =
    commentsSlice.actions;
const { reducer: commentsReduce } = commentsSlice;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { data } = await commentService.getSorted(userId);
        dispatch(commentsReceved(data.content));
    } catch (e) {
        dispatch(commentsRequestFailed(e.message));
        console.error(e);
    }
};

export const getComment = (id) => (state) =>
    state.profession.entities.find((item) => item._id === id);

export const getcommentsState = () => (state) => state.profession.entities;
export const getcommentsLoading = () => (state) => state.profession.isLoading;
export const getcommentsError = () => (state) => state.profession.error;

export default commentsReduce;
