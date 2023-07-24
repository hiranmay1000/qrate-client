import React from "react";

import "./usermenu.scss";
import { Link, useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";

export default function UserMenu() {
	const loggedUser = null;

	const navigate = useNavigate();
	const handleUserLogout = () => {
		toast.success("Logout successful");
		navigate("/login");
		localStorage.removeItem("token"); // remove token on user log out
		localStorage.removeItem("user_id"); // remove token on user log out
	};

	return (
		<>
			<div className="user-menu-wrapper">
				<div className="user-menu-container">
					<div className="user-menu profile">
						<Link to={`/${loggedUser.username}`}>
							<ImProfile /> Profile{" "}
						</Link>
					</div>
					<div className="user-menu settings">
						<Link to={"/settings"}>
							<RiUserSettingsFill /> Settings{" "}
						</Link>
					</div>
					<div className="user-menu logout">
						<Link to={"/login"} onClick={handleUserLogout}>
							<TbLogout2 /> Logout{" "}
						</Link>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}
