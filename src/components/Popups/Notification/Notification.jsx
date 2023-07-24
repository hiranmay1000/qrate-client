import { useEffect, useState } from "react";

import "./notification.scss";

export default function Notification() {
	const [currCnt, setCurrCnt] = useState(0);
	const [notificationCnt, setNotificationCnt] = useState(0);

	const loggedUser = null;

	useEffect(() => {
		if (loggedUser?.notifications?.length > 0) {
			setCurrCnt((prevCnt) => prevCnt + (loggedUser.notifications.length - notificationCnt));
			setNotificationCnt(loggedUser.notifications.length);
			console.log(currCnt);
		}
	}, [loggedUser?.notifications, currCnt, notificationCnt]);

	return (
		<div className="notification-wrapper">
			<h3>Notification</h3>
			<hr />
			<div className="notification">
				<div className="notification-text">
					{loggedUser?.notifications
						?.slice()
						.reverse()
						.map((noti, index) => (
							<div key={noti} className="notification-text-item">
								<p>{noti}</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
