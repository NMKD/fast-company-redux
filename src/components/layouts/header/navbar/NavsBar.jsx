import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "../../../ui/users/profile/navProfile";
import { useSelector } from "react-redux";
import { getUsersLoading } from "../../../../store/user";

const NavsBar = () => {
    // const stateUserCurrent = useSelector(getCurrentUser());
    const isLoggedIn = useSelector(getUsersLoading());
    return (
        <>
            <nav className="navb navbar navbar-expand-lg navbar-light bg-light mb-5">
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        {isLoggedIn && (
                            <ul className="nav">
                                <li className="nav-item m-2">
                                    <Link className="nav-link" to="/users">
                                        Users
                                    </Link>
                                </li>
                                <div>
                                    <NavProfile />
                                </div>
                            </ul>
                        )}
                    </div>
                    <div>
                        {!isLoggedIn && (
                            <ul className="nav">
                                <li className="nav-item m-2">
                                    <Link className="nav-link" to="/">
                                        Main
                                    </Link>
                                </li>
                                <li className="nav-item m-2">
                                    <Link
                                        className="nav-link"
                                        to="/login/singin"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavsBar;
