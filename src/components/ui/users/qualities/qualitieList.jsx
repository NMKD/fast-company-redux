import React from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualitiesState } from "../../../../store/qualities";

const QualitieList = ({ user }) => {
    const qualitiesState = useSelector(getQualitiesState());

    const getNewQualitiesOfUser = () => {
        const arr = [];
        if (qualitiesState !== null) {
            user.qualities.forEach((id) =>
                qualitiesState.forEach((q) => q._id === id && arr.push(q))
            );
        }

        return arr;
    };

    const qualitiesOfUser = user !== null && getNewQualitiesOfUser();

    return (
        <>
            <p className="card-text">
                {qualitiesOfUser.map((q) => (
                    <span key={q._id} className={`m-2 badge bg-${q.color}`}>
                        {q.name}
                    </span>
                ))}
            </p>
        </>
    );
};
QualitieList.propTypes = {
    user: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.object
    ])
};

export default QualitieList;
