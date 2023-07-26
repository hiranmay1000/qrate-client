import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import jwtDecode from "jwt-decode";

const useAuth = () => {
	const { user } = useContext(AuthContext);

	try {
		if (user) {
			const decoded = jwtDecode(user); // Type assertion, change to your actual decoded token type
			return decoded;
		}
		return null;
	} catch (error) {
		console.error("Invalid token:", error);
		// Handle the error, such as logging the user out or showing an error message.
		// Return null or an appropriate value to indicate an error.
		return null;
	}
};

export default useAuth; // The correct spelling is 'exports' instead of 'Exports'
