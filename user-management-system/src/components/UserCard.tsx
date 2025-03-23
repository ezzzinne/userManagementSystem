import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import { User } from "../store/userSlice";
import { Link } from "react-router-dom";

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const dispatch = useDispatch();

    return (
        <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.address.street}, {user.address.city}</p>
            <Link to={`/edit-user/${user.id}`}>Edit</Link>
            <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
        </div>
    );
};

export default UserCard;