import { React, useState } from "react";

import "./posts.scss";

import rateIcon from "../../images/icons/rate-star-icon2.png";
import rateIconRed from "../../images/icons/rate-icon-red-color-glass.png";

export default function Posts(postProps) {
    const [postRatings, setPostRatings] = useState([]);

    const handleGetPostRate = (index, rate) => {
        const updateRatings = [...postRatings];
        updateRatings[index] = rate;
        setPostRatings(updateRatings);
    };
    return (
        <div className="main-feed">
            <div className="main-feed-post">
                <div className="post-profile-top">
                    <div className="post-user">
                        <img src={postProps.post.url} alt="" srcSet="" />
                        <h5>{postProps.post.user}</h5>
                    </div>
                    <div className="user-details-bar">...</div>
                </div>
                <div className="post-bio">
                    <p>{postProps.post.description}</p>
                </div>
                <hr />
                <div className="post-img">
                    <img src={postProps.post.url} alt="" srcSet="" />
                </div>
                <div className="post-user-bottom">
                    <hr />
                    <div className="post-interaction-data">
                        <span>
                            <i className="fa fa-heart"></i>
                        </span>
                        &nbsp;&nbsp;
                        <span />
                    </div>
                    <hr />
                    <div className="post-interaction-btns">
                        <div className="like-btn">
                            {[1, 2, 3, 4, 5].map((rate, index) => (
                                <div
                                    onClick={() =>
                                        handleGetPostRate(index, rate)
                                    }
                                    className={`rating rate${rate}`}
                                    key={rate}
                                >
                                    <img
                                        src={
                                            postRatings >= rate
                                                ? rateIconRed
                                                : rateIcon
                                        }
                                        alt=""
                                    />
                                </div>
                            ))}
                            <div className="average-rating">
                                <p>4.7</p>
                            </div>
                        </div>
                        <div className="comment-btn">Comments</div>
                        <div className="share-btn">Share</div>
                    </div>
                    <hr />
                    <form action="" method="post">
                        <textarea
                            name=""
                            id={postProps.post.id}
                            placeholder="Comments..."
                        ></textarea>
                        <button type="submit">Comment</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
