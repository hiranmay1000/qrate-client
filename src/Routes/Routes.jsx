import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Friend from "../components/Friends/Friend";
import Profile from "../pages/Profile/Profile";
import Signup from "../pages/signup/Signup";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/Login/Login";

import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import ComingSoon from "../pages/ComingSoon/ComingSoon";

export default function ParkRoutes() {
	const { user } = useContext(AuthContext);

	console.log(user);

	return (
		<>
			<Router>
				<Routes>
					{/* <Route path="/" element={user ? <Home /> : <Signup />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={user ? <Home /> : <Login />} />
					<Route path="/:username" element={<Profile />} />
					<Route path="/fans" element={<Friend />} />*/}
					{/* <Route path="*" element={<ErrorPage />} /> */}
					<Route path="/" element={<ComingSoon />} />
				</Routes>
			</Router>
		</>
	);
}
