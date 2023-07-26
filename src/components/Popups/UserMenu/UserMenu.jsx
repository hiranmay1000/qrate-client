import React, { useContext } from "react";

import "./usermenu.scss";
import { Link, useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { RiUserSettingsFill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthContext";

export default function UserMenu() {
	const { user } = useContext(AuthContext);
	const loggedUser = user;

	const navigate = useNavigate();
	const handleUserLogout = () => {
		toast.success("Logout successful");
		setTimeout(() => {
			localStorage.removeItem("token");
			navigate("/login");
		}, 1500);
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
