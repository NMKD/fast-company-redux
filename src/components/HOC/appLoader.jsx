import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loadProfessionsList } from "../../store/profession";
import { loadQualitiesList } from "../../store/qualities";
import { loadUsersList } from "../../store/user";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProfessionsList());
        dispatch(loadQualitiesList());
        dispatch(loadUsersList());
    }, []);

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
