import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./userInfo.scss";

import profileImage from "../../../images/image/user-photo-temp.jpg";
import BgWallp from "../../../images/image/desktop-w.jpg";
import FadeBackground from "../../Popups/FadeBackground/FadeBackground";
import EditProfileForm from "../../Popups/EditProfileForm/EditProfileForm";

const api_url = process.env.REACT_APP_API_URL;
const curr_userID = "64ad3255791e739dd8f07077";

export default function UserInfo({ randomUserData }) {
    const [showBioTextarea, setShowBioTextarea] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [userBio, setUserBio] = useState("");

    const handleEditProfile = () => {
        setEdit(true);
    };

    const handleCancelForm = () => {
        setEdit(false);
    };

    const handleEditBio = () => {
        setShowBioTextarea(true);
    };

    // Submit new bio in database
    const handleSubmitBio = async (e) => {
        e.preventDefault();
        setShowBioTextarea(false);

        try {
            const response = await axios.put(
                `${api_url}/users/${curr_userID}`,
                {
                    userID: curr_userID,
                    bio: userBio,
                }
            );

            const user = response.data;
            setUserBio(user.bio);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <div className="user-information-top">
                <div className="user-profile">
                    <div className="user-cover-photo">
                        <img src={BgWallp} alt="" srcSet="" />
                    </div>
                    <div className="user-profile-photo-section">
                        <div className="user-photo-box">
                            <img
                                className="user-profile-photo"
                                src={profileImage}
                                alt=""
                                srcSet=""
                            />

                            <div>
                                <h4>{randomUserData.name}</h4>
                                {randomUserData.city && (
                                    <p>Lives in {randomUserData.city}</p>
                                )}
                            </div>
                        </div>

                        <div className="edit-profile">
                            <img
                                onClick={handleEditProfile}
                                className="edit-profile-icon"
                                width={30}
                                src="https://img.icons8.com/color/48/edit--v1.png"
                                alt="edit--v1"
                            />
                        </div>
                    </div>
                    <div className="user-bio">
                        {!showBioTextarea && <p>{randomUserData.bio}</p>}
                        <form>
                            {showBioTextarea && (
                                <>
                                    <textarea
                                        onChange={(e) =>
                                            setUserBio(e.target.value)
                                        }
                                        name="editbio"
                                        value={userBio}
                                    ></textarea>
                                    <button
                                        onClick={handleSubmitBio}
                                        type="submit"
                                    >
                                        Edit Bio
                                    </button>
                                </>
                            )}
                            {!showBioTextarea && (
                                <button onClick={handleEditBio} type="button">
                                    Edit Bio
                                </button>
                            )}
                        </form>
                    </div>
                    <hr />
                    <div className="user-details">
                        <p>
                            Joined on:{" "}
                            {new Date(
                                randomUserData.createdAt
                            ).toLocaleDateString()}
                        </p>
                        <p>Reputaion: 78</p>
                        <p>Status - Trusted Contributor</p>
                        <p>
                            Followed by{" "}
                            <strong>
                                {" "}
                                {randomUserData &&
                                    randomUserData.followers &&
                                    randomUserData.followers.length}{" "}
                                peoples
                            </strong>
                        </p>
                    </div>
                    <div className="edit-profile-btn">
                        <Link to={"/profile"}>Visit profile</Link>
                    </div>
                </div>
            </div>

            {isEdit && (
                <>
                    <FadeBackground handleCancelForm={handleCancelForm} />
                    <EditProfileForm handleCancelForm={handleCancelForm} />
                </>
            )}
        </>
    );
}
