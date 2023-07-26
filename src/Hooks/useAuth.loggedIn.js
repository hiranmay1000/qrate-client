const { useContext } = require("react");
const { AuthContext } = require("../Contexts/AuthContext");
const { default: jwtDecode } = require("jwt-decode");

const useAuth = () => {
	const { user } = useContext(AuthContext);

	try {
		if (user) {
			const decoded = jwtDecode(user);
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

module.exports = useAuth;
