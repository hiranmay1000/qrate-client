import axios from "axios";
import { toast } from "react-toastify";

const api_url = process.env.REACT_APP_API_URL;

// LOGIN CALL
export const loginCalls = async (userCredentials, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};

		const res = await axios.post(`${api_url}/auth/login`, userCredentials, { config });

		if (res?.status === 200) {
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); // dispatch to the authReducer
			toast.success(res.data.msg);
		}
	} catch (error) {
		dispatch({ type: "LOGIN_FAILURE", payload: error?.response?.data?.msg });
		toast.error(error?.response?.data?.msg);
	}
};
