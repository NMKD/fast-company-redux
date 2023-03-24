import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser, onSignOut } from "../../../../store/user";

const NavProfile = () => {
    const dispatch = useDispatch();
    const stateUserCurrent = useSelector(getCurrentUser());
    const [isOpen, setOpen] = useState(false);
    const toogleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const handleSignOut = () => {
        dispatch(onSignOut());
    };

    return (
        <div className="dropdown" onClick={toogleMenu}>
            <div className="btn dropdown-toogle d-flex align-items-center">
                <div className="me-2">
                    Пользователь: {stateUserCurrent?.name}
                </div>

                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
                    alt="avatar"
                    height="40px"
                    className="img-resposive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}>
                <Link
                    to={`/users/${stateUserCurrent?._id}`}
                    className="p-3 dropdown-item"
                >
                    Мой профиль
                </Link>
                <div className="p-3 dropdown-item" onClick={handleSignOut}>
                    Sign Out
                </div>
            </div>
        </div>
    );
};

export default NavProfile;
