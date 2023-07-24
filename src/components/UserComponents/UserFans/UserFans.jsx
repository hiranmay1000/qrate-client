import React from "react";
import { Link } from "react-router-dom";
import Friend from "../../Friends/Friend";

import "./userFans.scss";

export default function UserFans({ loggedUserData }) {
    return (
        <div className="user-fans-bottom">
            <div className="user-fans-heading">
                <h4>Fans</h4>
                <p>
                    <Link to={"/fans"}>See All</Link>
                </p>
            </div>
            <div className="all-fans-container">
                {loggedUserData?.followers?.length > 0 ? (
                    loggedUserData.followers.map((fanID) => (
                        <Friend fanID={fanID} key={fanID} />
                    ))
                ) : (
                    <>
                        <h4>No fan followings</h4>
                    </>
                )}
            </div>
        </div>
    );
}
