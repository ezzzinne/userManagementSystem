import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const AppRoutes: React.FC = () => {
    return (
        <Router basename="/userManagementSystem">
            <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/add-user" element={<UserForm />} />
                <Route path="/edit-user/:id" element={<UserForm />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes