import React from "react";
import { useParams } from "react-router-dom";
import UsersLoader from "../HOC/usersLoader";
import User from "../ui/users/user";
import UsersList from "../ui/users/usersList";

const Users = () => {
    const { id } = useParams();
    return (
        <>
            <UsersLoader>
                {" "}
                {id ? <User userId={id} /> : <UsersList />}
            </UsersLoader>
        </>
    );
};

export default Users;
