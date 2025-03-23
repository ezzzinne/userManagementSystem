import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/edit-user/:id" element={<UserForm />} />
        </Routes>
    );
};

export default AppRoutes