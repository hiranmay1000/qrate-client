import React, { useEffect } from "react";
import bulbFlickeringNoiseFile from "../../Audio/fluorescent-lamp-flickering-fit0ne.mp3";

import "./comingSoon.scss";

export default function ComingSoon() {
	useEffect(() => {
		const audio = new Audio(bulbFlickeringNoiseFile);
		if (audio.paused) {
			audio.play().catch((error) => {
				console.error("Error playing audio:", error.message);
			});
		}
	}, []);

	return (
		<div className="coming-soon-wrapper">
			<div className="coming-soon-container moveBody"></div>
		</div>
	);
}
