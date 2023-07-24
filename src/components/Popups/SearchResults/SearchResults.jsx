import { Link } from "react-router-dom";

import "./searchResults.scss";
import useSearchResults from "./useSearchResults";

export default function SearchResults(props) {
    const getUsers = useSearchResults(props);

    return (
        <>
            <div className="search-result-box">
                {getUsers.length > 0 ? (
                    getUsers.map((user) => (
                        <Link
                            key={user._id}
                            onClick={props.handleDisableModal}
                            to={`/${user.username}`}
                        >
                            {user.name}
                        </Link>
                    ))
                ) : (
                    <Link to={"/"}>No user found</Link>
                )}
            </div>
        </>
    );
}
