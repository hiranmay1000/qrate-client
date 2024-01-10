import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { shuffle } from "lodash";

import "./middlecontainer.scss";

import profileImage from "../../images/image/user-photo-temp.jpg";
import FadeBackground from "../Popups/FadeBackground/FadeBackground";
import CreatePostText from "../Popups/CreatePost/CreatePostText";
import Posts from "../Posts/Posts";
import LeftContainer from "../LeftContainer/LeftContainer";
import RightContainer from "../RightContainer/RightContainer";

export default function MiddlePostContainer() {
	const [posts, setPosts] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const user = "" // temp

	const handleReadOnlyInpBar = () => {
		setShowForm(true);
	};

	const handleDisableModal = () => {
		setShowForm(false);
	};

	useEffect(() => {
		try {
			const fetchPost = async () => {
				const response = await axios.get("https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20");

				const data = await response.data;
				const shuffledPosts = shuffle(data.photos);
				setPosts(shuffledPosts);
			};

			fetchPost();
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	return (
		<>
			<LeftContainer userData={user} />

			<div className="middle-container">
				<div className="middle-container-scrollable">
					{showForm && (
						<>
							<FadeBackground />
							<CreatePostText isDisplayForm={showForm} handleDisableModal={handleDisableModal} />
						</>
					)}

					{/* TIMELINE SECTION */}
					<div className="create-new-post-container">
						<div className="create-post-top-part">
							<div className="profile-image">
								<img src={profileImage} alt="" srcSet="" />
							</div>
							<div className="dummy-input-bar">
								<input
									type="text"
									name="feed-input-bar"
									id=""
									placeholder="What's on your mind?"
									onClick={handleReadOnlyInpBar}
									readOnly
								/>
							</div>
						</div>
						<div className="create-post-bottom-part">
							<div className="upload-videos-icon">
								<img width={30} src="https://img.icons8.com/office/40/cinema---v1.png" alt="cinema---v1" />
							</div>
							<div className="upload-photoes-icon">
								<img width={30} src="https://img.icons8.com/color/48/add-image.png" alt="add-new-img" />
							</div>
							<div onClick={handleReadOnlyInpBar} className="create-post-icon">
								<img width={30} src="https://img.icons8.com/color/48/create-new.png" alt="create-new" />
							</div>
							<div className="upload-feelings-activity"></div>
						</div>
					</div>

					{posts.length > 0 ? (
						posts.map((post) => <Posts key={post.id} post={post} />)
					) : (
						<p>Your timeline is getting ready! please wait...</p>
					)}
				</div>
			</div>

			<RightContainer />
		</>
	);
}
