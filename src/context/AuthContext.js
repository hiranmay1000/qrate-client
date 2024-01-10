import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import jwt_decode from "jwt-decode";

const api_url = process.env.REACT_APP_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [decodedToken, setDecodedToken] = useState([]);

	useEffect(() => {
		// Check for the presence of the token in localStorage on mount
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []); // Empty dependency array ensures this effect runs only on mount

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			console.log(jwt_decode(token));
			setDecodedToken(jwt_decode(token));
		}
	}, []);

	const login = async (userCredentials) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			};
			const response = await axios.post(`${api_url}/auth/login`, userCredentials, { config });

			if (response.status === 200) {
				setIsLoggedIn(true);
				const token = response.data.token;
				localStorage.setItem("token", token);
				toast.success("Login successful!");
			} else {
				toast.error("Invalid username or password");
			}
		} catch (error) {
			console.error("Login error:", error);
			toast.error("An error occurred during login");
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		toast.info("Logged out successfully");
		setIsLoggedIn(false);
	};

	return <AuthContext.Provider value={{ isLoggedIn, decodedToken, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
