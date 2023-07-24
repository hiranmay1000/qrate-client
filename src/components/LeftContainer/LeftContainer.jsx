import "../../components/LeftContainer/leftContainer.scss";

import UserFans from "../UserComponents/UserFans/UserFans";
import SideMenu from "../Popups/SideMenu/SideMenu";

export default function LeftContainer() {
	const loggedUserData = null;
	return (
		<>
			<div className="left-container">
				<SideMenu />
				<UserFans loggedUserData={loggedUserData} />
			</div>
		</>
	);
}
