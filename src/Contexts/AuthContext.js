// AuthContext.js
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const token = localStorage.getItem("token");
const INITIAL_STATE = {
	user: token || null, // Initialize with the token from localStorage if available
	isFetching: false,
	error: false,
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	// Update the user state with the token on page refresh
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			dispatch({ type: "LOGIN_SUCCESS", payload: token });
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
