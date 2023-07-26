import React from "react";
import { TbError404 } from "react-icons/tb";
import { BiSolidError } from "react-icons/bi";

import "./errorPage.scss";
import { Link } from "react-router-dom";

export default function ErrorPage() {
	return (
		<div className="error-wrapper">
			<div className="error-container">
				<div className="error-message">
					<h1>RATERA</h1>
					<h5>
						The page you are looking for either does <em>not exist</em> or <em>corrupted!</em> with status code -{" "}
						<br />
						<BiSolidError />
						<TbError404 />
					</h5>
				</div>
				<div className="authentication-btns">
					<Link to={"/signup"}>Sign up </Link>
					<Link to={"/login"}>Login </Link>
				</div>
			</div>
		</div>
	);
}
