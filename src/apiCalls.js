import axios from "axios";
import { toast } from "react-toastify";

const api_url = process.env.REACT_APP_API_URL;

// LOGIN CALL
export const loginCalls = async (userCredentials, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const res = await axios.post(`${api_url}/auth/login`, userCredentials, { withCredentials: true });

		if (res?.status === 200) {
			localStorage.setItem("token", res.data.token);
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); // dispatch to the authReducer
			toast.success(res.data.msg);
		}
	} catch (error) {
		dispatch({ type: "LOGIN_FAILURE", payload: error?.response?.data?.msg });
		toast.error(error?.response?.data?.msg);
	}
};
