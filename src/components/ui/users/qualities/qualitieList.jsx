import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
// import { useQualitiesContext } from "../../../../hooks/useQualities";
import { useSelector } from "react-redux";
import { getLoading, getQualitiesState } from "../../../../store/qualities";

const QualitieList = ({ qualities }) => {
    const stateQualities = useSelector(getQualitiesState());
    const isLoading = useSelector(getLoading());
    const getQualities = (q) => {
        const arrayQualities = [];
        q.forEach((id) => {
            stateQualities.forEach((item) => {
                if (item._id === id) {
                    arrayQualities.push(item);
                }
            });
        });
        return arrayQualities;
    };
    const data = getQualities(qualities);

    return (
        <>
            {!isLoading ? (
                <p className="card-text">
                    {data &&
                        data.map((q) => (
                            <Qualitie key={q.color + q.name} {...q} />
                        ))}
                </p>
            ) : (
                <span>Loading...</span>
            )}
        </>
    );
};
QualitieList.propTypes = {
    qualities: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.string)
    ])
};

export default QualitieList;
