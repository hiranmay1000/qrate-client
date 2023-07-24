import { useEffect, useState } from "react";
import axios from "axios";

const api_url = process.env.REACT_APP_API_URL;

export default function useSearchResults(props) {
	let [getUsers, setUsers] = useState([]);

	useEffect(() => {
		const fetchSearchUserData = async () => {
			try {
				const url = api_url;
				const response = await axios.get(`${url}/users/accounts/all?search=${props.searchUsers}`);
				const data = response.data;

				setUsers(data.users);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchSearchUserData();
	}, [props.searchUsers]);

	return getUsers;
}
