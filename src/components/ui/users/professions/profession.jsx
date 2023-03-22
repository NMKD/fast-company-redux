import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfession,
    getProfessionsLoading
} from "../../../../store/profession";

const Profession = ({ id }) => {
    const data = useSelector(getProfession(id));
    const loading = useSelector(getProfessionsLoading());

    return <p>{loading ? "loading..." : data.name}</p>;
};

Profession.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Profession;
