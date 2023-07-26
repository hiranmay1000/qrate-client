import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Friend from "../components/Friends/Friend";
import Profile from "../pages/Profile/Profile";
import Signup from "../pages/signup/Signup";
import ErrorPage from "../pages/Error/ErrorPage";
import Login from "../pages/Login/Login";
import useAuth from "../Hooks/useAuth.loggedIn";

export default function ParkRoutes() {
	// Get the decoded token from useAuth instead of user state
	const decodedToken = useAuth();
	console.log("My decoded token: ", decodedToken);

	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={decodedToken ? <Home /> : <Signup />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={decodedToken ? <Navigate to="/" /> : <Login />} />
					<Route path="/:username" element={<Profile />} />
					<Route path="/user/fans" element={<Friend />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</Router>
		</>
	);
}
