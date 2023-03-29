import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, getIsLoggedIn, loadUsersList } from "../../store/user";

const UsersLoader = ({ children }) => {
    const dataLoaded = useSelector(getDataStatus());
    const isLoggedIn = useSelector(getIsLoggedIn());

    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataLoaded) {
            console.log(dataLoaded);
            dispatch(loadUsersList());
        }
    }, []);

    if (!isLoggedIn) return "waiting.....";
    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
