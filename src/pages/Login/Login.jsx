import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { ToastContainer } from "react-toastify";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { PiSignInBold } from "react-icons/pi";
import loginCalls from "../../apiCalls";

import "./login.scss";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [activeErrField, setActiveErrField] = useState("");
	const [isHidden, setIsHidden] = useState(false);
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();

		login({
			username,
			password,
		});
	};

	const handleSignupBtn = () => {};

	const handleResetPasswordModal = () => {};
	return (
		<>
			<div
				className="login-container"
				style={{
					opacity: isHidden ? 0 : 1,
				}}>
				<div className="login-img-banner">
					<h2>Please login to proceed</h2>
					<p>Welcome to Qrate community</p>
					<p>To create Account</p>
					<button onClick={handleSignupBtn} type="button">
						<HiChevronDoubleLeft />
						Sign Up
					</button>
				</div>
				<div className="login-box">
					<form onSubmit={handleLogin} action="">
						<h2>Login</h2>
						<input
							onChange={(e) => {
								setUsername(e.target.value);
								setActiveErrField("");
							}}
							type="username"
							name="username"
							className={`login-input ${activeErrField}`}
							id="uname"
							placeholder="username"
						/>
						<input
							onChange={(e) => {
								setPassword(e.target.value);
								setActiveErrField("");
							}}
							type="password"
							name="password"
							className={`login-input ${activeErrField}`}
							id="password"
							placeholder="password"
						/>
						<button type="submit">
							{false ? (
								<CircularProgress color="inherit" size="20px" />
							) : (
								<>
									<p>Login</p> <PiSignInBold />
								</>
							)}
						</button>

						<div className="login-forgot-password">
							<Link onClick={handleResetPasswordModal}>Forgot password?</Link>
						</div>
					</form>
				</div>
			</div>
			<ToastContainer hideProgressBar newestOnTop={true} theme="dark" />
		</>
	);
}
