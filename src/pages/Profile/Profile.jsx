import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { shuffle } from "lodash";

import "./profile.scss";

import coverPhoto from "../../images/image/desktop-w.jpg";
import profilePic from "../../images/image/user-photo-temp.jpg";

import Navbar from "../../components/Navbar/Navbar";
import UserInfo from "../../components/UserComponents/UserInfo/UserInfo";
import Posts from "../../components/Posts/Posts";

const api_url = process.env.REACT_APP_API_URL;
export default function Profile({ userData }) {
    const [posts, setPosts] = useState([]);
    const [randomUserData, setRandomUserData] = useState([]);

    const navigate = useNavigate();

    // fetch random user
    const { username } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${api_url}/users/username/${username}/account`);
                setRandomUserData(response.data);

                const postResponse = await axios.get("https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20");
                const postData = await postResponse.data;
                const shuffledPosts = shuffle(postData.photos);
                setPosts(shuffledPosts);
            } catch (error) {
                console.log("Error fetching data", error.message);
                if (error.response?.data?.success === false) {
                    navigate("*");
                }
            }
        };

        fetchData();
    }, [username, navigate, userData]);

    return (
        <>
            <Navbar userData={userData} />
            <div className="profile-wrapper">
                <div className="profile-container-top">
                    <div className="profile-top-part">
                        <div className="profile-cover-photo">
                            <img src={coverPhoto} alt="profile-cover" srcSet="" />
                        </div>

                        <div className="profile-section">
                            <div className="profile-info-main">
                                <div className="profile-picture">
                                    <img src={profilePic} alt="profile-pic" srcSet="" />
                                </div>
                                <div className="profile-title">
                                    <h3>{randomUserData.name}</h3>
                                    {randomUserData.location && <span>From {randomUserData.location.country}</span>}
                                    <div className="user-overall-rating">
                                        <h5>4.5</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-info-desc">
                                <p>{randomUserData.bio}</p>
                            </div>
                            <hr />
                            <div className="user-rating-data">
                                <div className="user-rating-data-wrapper">
                                    <li>Posts</li>
                                    <hr />
                                    <li>Kindness</li>
                                    <li>Helpfulness</li>
                                    <li>Politeness</li>
                                    <li>Truthful</li>
                                    <li>Trustworthy</li>
                                </div>
                            </div>
                            <hr />
                            <div className="profile-navigation-links-bottom">
                                <Link>
                                    <h4>Link</h4>
                                </Link>
                                <Link>
                                    <h4>Link</h4>
                                </Link>
                                <Link>
                                    <h4>Link</h4>
                                </Link>
                                <Link>
                                    <h4>Link</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-container-bottom">
                    <div className="profile-container-bottom-left">
                        <div>
                            <UserInfo randomUserData={randomUserData} />
                        </div>
                        <div className="copyright-disclaimer">
                            <p>c 2023 Qrate</p>
                            <p>All Rights Reserved </p>
                        </div>
                    </div>

                    <div className="profile-container-bottom-right">
                        <div className="user-own-timeline-scrollable">
                            {posts.length > 0 ? (
                                posts.map((post) => <Posts key={post.id} post={post} />)
                            ) : (
                                <p>Your timeline is getting ready! please wait...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
