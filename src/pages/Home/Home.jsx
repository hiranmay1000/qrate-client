import MiddleContainer from "../../components/MiddleContainer/MiddleContainer";
import Navbar from "../../components/Navbar/Navbar";

import "./home.scss";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className="home-page-container">
				<MiddleContainer />
			</div>
		</>
	);
}
