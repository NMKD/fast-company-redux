import React from "react";
import { useParams } from "react-router-dom";
import User from "../ui/users/user";
import UsersList from "../ui/users/usersList";

const Users = () => {
    const { id } = useParams();
    return <>{id ? <User userId={id} /> : <UsersList />}</>;
};

export default Users;
