import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";

import { AuthContext } from "../../Contexts/AuthContext";

import "../../components/Navbar/navbar.scss";
import UserMenu from "../Popups/UserMenu/UserMenu";
import FadeBackground from "../Popups/FadeBackground/FadeBackground";
import SearchResults from "../Popups/SearchResults/SearchResults";
import Notification from "../Popups/Notification/Notification";

export default function Navbar() {
	let [searchUsers, setSearchUsers] = useState("");
	const [isVisibleSearchResult, setVisibleSearchResult] = useState(false);
	const [isVisibleMenu, setVisibleMenu] = useState(false);
	const [isVisibleNotification, setVisibleNotification] = useState(false);
	const [isAlertNewNotification, setAlertNewNotification] = useState(false);

	const handleSearchUsers = (e) => {
		setSearchUsers(e.target.value);
		setVisibleSearchResult(true);
	};

	const hideModals = () => {
		setVisibleSearchResult(false);
		setVisibleMenu(false);
		setVisibleNotification(false);
	};

	const handleDisableModal = () => {
		hideModals();
	};

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			hideModals();
		}
	});

	useEffect(() => {
		const handleScroll = () => {
			hideModals();
		};

		window.addEventListener("scroll", handleScroll);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	function handleShowUserMenu() {
		setVisibleMenu(true);
	}

	function handleShowNotification() {
		setVisibleNotification(true);
		setAlertNewNotification(false);
	}

	const [loggedUser, setLoggedUser] = useState([]);

	const { user } = useContext(AuthContext);
	useEffect(() => {
		if (user) {
			setLoggedUser(user);
			console.log(user?.token?.username);
		}
	}, [user]);

	return (
		<>
			<div className="navbar-main">
				<div className="left-start-part">
					<h2 className="logo-brand">
						<Link to={"/"}>Ratera</Link>
					</h2>
				</div>
				<div className="mid-part">
					<div className="search-box-top">
						<img src="https://img.icons8.com/color-glass/48/search--v1.png" alt="search--v1" />
						<input
							onChange={handleSearchUsers}
							type="text"
							name="search-bar"
							placeholder="Search by username / name"
						/>
					</div>
					{isVisibleSearchResult && (
						<>
							<FadeBackground bgColor="transparent" marginTop="50px" handleDisableModal={handleDisableModal} />
							<SearchResults handleDisableModal={handleDisableModal} searchUsers={searchUsers} />
						</>
					)}
				</div>
				<div className="right-end-part">
					<div className="nav-icon  bell-icon-navbar">
						<img
							onClick={handleShowNotification}
							width={30}
							src="https://img.icons8.com/color/48/appointment-reminders--v1.png"
							alt="appointment-reminders--v1"
						/>
						{isAlertNewNotification && (
							<span style={{ position: "absolute" }}>
								<GoDotFill />
							</span>
						)}
					</div>
					<div className="nav-icon message-icon-navbar">
						<img
							width={30}
							src="https://img.icons8.com/avantgarde/100/speech-bubble-with-dots.png"
							alt="speech-bubble-with-dots"
						/>
					</div>
					<div className="nav-icon user-profile-avatar">
						<div className="user-profile-avatar-username" onClick={handleShowUserMenu}>
							<h5>{loggedUser?.token?.username}</h5>
						</div>
						{isVisibleMenu && [
							<FadeBackground
								key={"user-menu"}
								bgColor="transparent"
								handleDisableModal={handleDisableModal}
							/>,
							<UserMenu key={"user-menu"} />,
						]}
					</div>
					{isVisibleNotification && [
						<FadeBackground key={"user-menu"} bgColor="transparent" handleDisableModal={handleDisableModal} />,
						<Notification key={"user-notification"} />,
					]}
				</div>
			</div>
		</>
	);
}
