import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, selectUsers } from "../store/userSlice";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../store/store";
import "./UserList.css"

const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectUsers);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }  
    }, [dispatch, users.length]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>

    return (
        <div className="container">
            <h2>User List</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <p><strong>Email: </strong>{user.email}</p>
                        <p><strong>Phone: </strong>{user.phone}</p>
                        <p><strong>Company: </strong>{user.company.name}</p>
                        <div className="user-actions">
                            <Link to={`/edit-user/${user.id}`}>
                                <button className="edit-btn">Edit</button>
                            </Link>
                            <button style={{ background: "red"}} onClick={() => dispatch(deleteUser(user.id))} className="delete-btn">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/add-user" className="add-user-btn">Add New User</Link>
        </div>
    );
};

export default UserList;