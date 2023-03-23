import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfession } from "../../../../store/profession";

const Profession = ({ id }) => {
    const data = useSelector(getProfession(id));

    if (!id) {
        return <span>loading... </span>;
    }

    return <p>{data.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Profession;
