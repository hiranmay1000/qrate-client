import { createContext, useMemo, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { useCookies } from "react-cookie"; // Import the react-cookie hook

const INITIAL_STATE = {
	user: null,
	isFetching: false,
	error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
	const [cookies] = useCookies(["authentication_JWT_token"]);

	console.log("Cookie: ", cookies);
	return useMemo(() => {
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
	}, [children, state.error, state.isFetching, state.user]);
};
