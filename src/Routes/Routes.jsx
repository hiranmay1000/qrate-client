import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Home from "../pages/Home/Home";
import Friend from "../components/Friends/Friend";
import Profile from "../pages/Profile/Profile";
import Signup from "../pages/signup/Signup";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/Login/Login";
import { useAuth } from "../context/AuthContext";

export default function ParkRoutes() {
	const { isLoggedIn } = useAuth();

	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={isLoggedIn ? <Home /> : <Login />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/:username" element={<Profile />} />
					<Route path="/fans" element={<Friend />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</>
	);
}
