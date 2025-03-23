import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, selectUsers } from "../store/userSlice";
import { User } from "../store/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./UserForm.css"

interface UserFormProps {
    user?: User;
}

const UserForm: React.FC<UserFormProps> = ({ user }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const initialFormData: User = user || { 
        id: 0, 
        name: "", 
        email: "", 
        phone: "", 
        address: { street: "", city: "" }, 
        company: { name: "" } 
    };
    const [formData, setFormData] = useState<User>(initialFormData);

    useEffect(() => {
        if (id) {
            const existingUser = users.find(user => user.id === Number(id));
            if (existingUser) {
                setFormData(existingUser);
            } 
        }
    }, [id, users])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setFormData((prev) => {
            if (name.includes(".")) {
                const [parent, child] = name.split(".") as ["address" | "company", string];
    
                return {
                    ...prev,
                    [parent]: {
                        ...(prev[parent] || {}),
                        [child]: value,
                    },
                };
            }
    
            return { ...prev, [name]: value };
        });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            dispatch(updateUser({ ...formData, id: Number(id) }));
        } else {
            dispatch(addUser({ ...formData, id: Date.now() }));
        }
        navigate("/users");
    };

    return (
        <div className="container">
            <h2>{id ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-container">
                    <label htmlFor="name">Name: </label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email: </label>
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="input-container">
                    <label htmlFor="phone">Phone No: </label>
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
                </div>
                <div className="input-container">
                    <label htmlFor="address.street">Street Address: </label>
                    <input name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" required />
                </div>
                <div className="input-container">
                    <label htmlFor="address.city">City: </label>
                    <input name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" required />
                </div>
                <div className="input-container">
                    <label htmlFor="company.name">Company: </label>
                    <input name="company.name" value={formData.company.name} onChange={handleChange} placeholder="Company Name" required />
                </div>
                <button type="submit" className="submit-btn">{id ? "Update" : "Add"} User</button>
            </form>
        </div>
    );
};

export default UserForm;