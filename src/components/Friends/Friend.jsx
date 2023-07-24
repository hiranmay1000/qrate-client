import React, { useEffect, useState } from "react";
import axios from "axios";

import profileImage from "../../images/image/user-photo-temp.jpg";

import "./friend.scss";
import { Link } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

export default function Friend({ fanID }) {
    const [name, setName] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${api_url}/users/${fanID}/account`;
                const token = localStorage.getItem("token");
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data;
                if (!data) {
                    setName("Deleted Account");
                    return;
                }

                setName(data.name);
                setUsername(data.username);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        };
        fetchData();
    }, [fanID]);

    return (
        <div className="fan-container">
            <Link key={fanID} to={`/${username}`}>
                <div className="my-fan">
                    <img src={profileImage} alt="profile-pic" srcSet="" />
                    <p>{name}</p>
                </div>
            </Link>
        </div>
    );
}
