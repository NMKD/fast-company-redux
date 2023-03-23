import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "../../../ui/users/profile/navProfile";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../../store/user";

const NavsBar = () => {
    const stateUserCurrent = useSelector(getCurrentUser());
    return (
        <>
            <nav className="navb navbar navbar-expand-lg navbar-light bg-light mb-5">
                <div className="container-fluid d-flex justify-content-between">
                    <div>
                        <ul className="nav">
                            <li className="nav-item m-2">
                                <Link className="nav-link" to="/">
                                    Main
                                </Link>
                            </li>
                            {stateUserCurrent !== null && (
                                <li className="nav-item m-2">
                                    <Link className="nav-link" to="/users">
                                        Users
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul className="nav">
                            {stateUserCurrent !== null ? (
                                <div>
                                    <NavProfile />
                                </div>
                            ) : (
                                <li className="nav-item m-2">
                                    <Link
                                        className="nav-link"
                                        to="/login/singin"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavsBar;
