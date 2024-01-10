import { HiMoon } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./sideMenu.scss";
import { useAuth } from "../../../context/AuthContext";

export default function SideMenu() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const { decodedToken } = useAuth();

	const toggleThemeMode = () => {
		document.body.classList.toggle("dark-mode", !isDarkMode);
		setIsDarkMode(!isDarkMode);
	};

	return (
		<>
			<div className="side-menu-wrapper">
				<div className="side-bar-heading">
					<h3>{decodedToken?.name}</h3>
					<div className="side-bar-ui-theme">
						<button onClick={toggleThemeMode} title="Switch theme">
							<HiMoon />
						</button>
					</div>
				</div>
				<hr />
				<div className="side-menu-container">
					<div className="side-menu-item">
						<Link to={""}>Home</Link>
					</div>
					<div className="side-menu-item">
						<Link to={`/${decodedToken?.username}`}>Profile</Link>
					</div>
					<div className="side-menu-item">
						<Link to={""}>About</Link>
					</div>
					<div className="side-menu-item">
						<Link to={""}>Home</Link>
					</div>
					<div className="side-menu-item">
						<Link to={""}>Dashboard</Link>
					</div>
					<div className="side-menu-item">
						<Link to={""}>Settings</Link>
					</div>
				</div>
			</div>
		</>
	);
}
