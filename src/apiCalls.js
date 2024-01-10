import axios from "axios";
import { toast } from "react-toastify";

const api_url = process.env.REACT_APP_API_URL;

// LOGIN CALL
export const loginCalls = async (userCredentials) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};

		const res = await axios.post(`${api_url}/auth/login`, userCredentials, { config });

		if (res?.status === 200) {
			const token = res.data.token;
			localStorage.setItem("token", token);
			// login(); // Notify AuthContext about the successful login
			toast.success(res.data.msg);
		}
	} catch (error) {
		toast.error(error?.response?.data?.msg);
	}
};

export default loginCalls;
