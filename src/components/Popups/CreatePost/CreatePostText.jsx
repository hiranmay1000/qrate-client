import React, { useEffect, useState } from "react";
import FadeBackground from "../FadeBackground/FadeBackground";

import "./createPostText.scss";

export default function CreatePostText(props) {
    const [userThoughts, setUserThoughts] = useState("");

    const handleSubmitThoughts = (e) => {
        e.preventDefault();
    };

    const handleCreatePostCancelBtn = () => {
        props.handleDisableModal();
        setUserThoughts("");
    };

    useEffect(() => {
        const handleScroll = () => {
            props.handleDisableModal();
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [props, props.handleDisableModal]);

    return (
        <>
            <FadeBackground
                key="fadeBackground"
                zIndex="99"
                handleDisableModal={props.handleDisableModal}
            />
            <div
                key="writeNewPostContainer"
                className="write-new-post-container"
            >
                <form
                    action=""
                    onSubmit={handleSubmitThoughts}
                    className="write-post-form"
                >
                    <div
                        className="cancel-write-new-post"
                        onClick={handleCreatePostCancelBtn}
                    >
                        X
                    </div>
                    <h2>Create post</h2>
                    <hr />
                    <textarea
                        name=""
                        placeholder="Your Thoughts!"
                        onChange={(e) => setUserThoughts(e.target.value)}
                        value={userThoughts}
                    ></textarea>
                    <hr />
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    );
}
