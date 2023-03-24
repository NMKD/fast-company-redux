import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AddCommentForm from "./addCommentForm";
import CommentList from "./commentList";
import { orderBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../../store/user";
import {
    getCommentsIsLoading,
    getCommentsState,
    loadCommentsList,
    createComment,
    removeComment
} from "../../../store/comments";

const Comments = ({ paramId }) => {
    const dispatch = useDispatch();
    const stateUserCurrent = useSelector(getCurrentUser());
    const stateComments = useSelector(getCommentsState());
    const isLoading = useSelector(getCommentsIsLoading());

    const handlSubmit = (data) => {
        dispatch(
            createComment({
                ...data,
                pageId: paramId,
                userId: stateUserCurrent._id
            })
        );
    };

    useEffect(() => {
        dispatch(loadCommentsList(paramId));
    }, [paramId]);

    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    const sortedComments =
        stateComments !== null &&
        orderBy(stateComments, ["created-by"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    {paramId && <AddCommentForm onSubmit={handlSubmit} />}
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading ? (
                        <CommentList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
};

Comments.propTypes = {
    paramId: PropTypes.string.isRequired
};

export default Comments;
