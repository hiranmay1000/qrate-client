import { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./userMayKnow.scss";

import profileImage from "../../../images/image/user-photo-temp.jpg";

const api_url = process.env.REACT_APP_API_URL;
const FOLLOW_STORAGE_KEY = "followedUsers";

export default function UserMayKnow() {
	const [userData, setUserData] = useState([]);
	const followedUsers = [] || [];
	const loggedUser = "";

	const handleFollowBtn = async (userToFollow) => {
		try {
			const res = await axios.put(`${api_url}/users/${loggedUser._id}/follow`, {
				userID: userToFollow._id,
			});
			toast.success(res.data.msg);

			// Update the user data in the state to reflect the follow action
			setUserData((prevUserData) =>
				prevUserData.map((user) => (user._id === userToFollow._id ? { ...user, isFollowing: true } : user))
			);
			// Update local storage to store the follow action
			const updatedFollowedUsers = [...followedUsers, userToFollow._id];
			localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(updatedFollowedUsers));
		} catch (error) {
			toast.error(error.response.data.msg);
		}
	};

	const handleUnfollowBtn = async (userToUnfollow) => {
		try {
			const res = await axios.put(`${api_url}/users/${loggedUser._id}/unfollow`, {
				userID: userToUnfollow._id,
			});
			toast.warning(res.data.msg);

			// Update the user data in the state to reflect the unfollow action
			setUserData((prevUserData) =>
				prevUserData.map((user) => (user._id === userToUnfollow._id ? { ...user, isFollowing: false } : user))
			);
			// Update local storage to remove the unfollowed user
			const updatedFollowedUsers = followedUsers.filter((id) => id !== userToUnfollow._id);
			localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(updatedFollowedUsers));
		} catch (error) {
			toast.error(error.response.data.msg);
		}
	};

	return (
		<>
			<div className="friend-suggestion">
				<h5 className="suggested-banner">You may know</h5>
				<div className="friend-suggestion-container">
					<div className="suggested-friends-accounts">
						{userData.length > 0 ? (
							userData.map((user) =>
								loggedUser._id !== user._id ? (
									<div key={user._id} className="suggested-friends">
										<div className="suggested-friend-profile">
											<img src={profileImage} alt="" srcSet="" />
											<h5>{user.name}</h5>
										</div>
										<div className="support-btn">
											{followedUsers.includes(user._id) ? (
												<button onClick={() => handleUnfollowBtn(user)} type="button">
													Unfollow
												</button>
											) : (
												<button onClick={() => handleFollowBtn(user)} type="button">
													Follow
												</button>
											)}
										</div>
									</div>
								) : null
							)
						) : (
							<h4>Loading...</h4>
						)}
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}
