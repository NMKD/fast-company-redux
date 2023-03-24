import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../service/coment.service";

const commentsSlice = createSlice({
    name: "comments",
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
        },
        commentsCreateFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        },
        commentCreatedSuccess(state, { payload }) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.unshift(payload);
        },
        commentRequestedFailed(state, { payload }) {
            state.error = payload;
            state.isLoading = false;
        },
        commentRemovedSuccess(state, { payload }) {
            state.entities = state.entities.filter(
                (item) => item._id !== payload
            );
        }
    }
});

const {
    commentsRequested,
    commentsReceved,
    commentsRequestFailed,
    commentsCreateFailed,
    commentCreatedSuccess,
    commentRequestedFailed,
    commentRemovedSuccess
} = commentsSlice.actions;
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
const commentRequestedCreate = createAction("comments/commentRequestedCreate");
const commentRequestedRemove = createAction("comments/commentRequestedRemove");

export const createComment = (payload) => async (dispatch) => {
    dispatch(commentRequestedCreate());
    try {
        const { data } = await commentService.create({
            ...payload,
            create_at: Date.now(),
            _id: nanoid()
        });
        dispatch(commentCreatedSuccess(data.content));
    } catch (e) {
        dispatch(commentsCreateFailed(e.message));
        console.error(e);
    }
};

export const removeComment = (id) => async (dispatch) => {
    dispatch(commentRequestedRemove());
    try {
        await commentService.delete(id);
        dispatch(commentRemovedSuccess(id));
    } catch (e) {
        dispatch(commentRequestedFailed(e.message));
        console.error(e);
    }
};

export const getComment = (id) => (state) =>
    state.comments.entities.find((item) => item._id === id);

export const getCommentsState = () => (state) => state.comments.entities;
export const getCommentsIsLoading = () => (state) => state.comments.isLoading;
export const getCommentsError = () => (state) => state.comments.error;

export default commentsReduce;
