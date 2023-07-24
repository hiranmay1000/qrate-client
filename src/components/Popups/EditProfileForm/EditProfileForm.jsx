import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./editprofileform.scss";

const API_URL = "http://localhost:8080/api";

export default function EditProfileForm({ handleCancelForm }) {
    let [name, setName] = useState("");
    let [username, setUsername] = useState("");
    // let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [dob, setDob] = useState("");
    let [city, setCity] = useState("");
    let [country, setCountry] = useState("");
    const [userData, setUserData] = useState([]);

    const formRef = useRef(null);

    const handleCancelEditForm = () => {
        handleCancelForm();
    };

    // Fetch  data from user
    useEffect(() => {
        try {
            const fetchData = async () => {
                // Make API call to get user data and populate form fields with existing values
                const response = await axios.get(
                    `${API_URL}/user/64ad3255791e739dd8f07077/account`
                );

                const data = response.data;

                setName(data.name);
                setUsername(data.username);
                setEmail(data.email);
                setDob(data.dob);
                setCity(data.city);
                setCountry(data.country);
                setUserData(data);
            };
            fetchData();
        } catch (error) {
            alert(`Something went wrong while getting data! ${error}`);
        }
    }, []);

    // Submit form edit request
    const handleEditFormSubmition = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(formRef.current);
            formData.append("name", name);
            formData.append("username", username);
            formData.append("email", email);
            formData.append("dob", dob);
            formData.append("city", city);
            formData.append("country", country);

            const response = await axios.put(
                `${API_URL}/user/64ad3255791e739dd8f07077/account`,
                {
                    userID: "64ad3255791e739dd8f07077",
                    formData,
                }
            );

            const data = response.data;
            console.log(data.msg);
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div className="edit-profile-form-container">
            <div className="edit-profile-form-box">
                <div
                    className="edit-form-cancel-btn"
                    onClick={handleCancelEditForm}
                >
                    X
                </div>
                <form
                    className="edit-profile-form"
                    onSubmit={handleEditFormSubmition}
                    ref={formRef}
                    action=""
                >
                    <h3>EDIT INFORMATION</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={userData.name}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                    />
                    <input
                        type="date"
                        name="dob"
                        placeholder="dob"
                        value={dob}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="city"
                        value={city}
                    />
                    <input
                        type="country"
                        name="country"
                        placeholder="country"
                        value={country}
                    />
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}
