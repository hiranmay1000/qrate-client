import { HiMoon } from "react-icons/hi";

import "./sideMenu.scss";
import { Link } from "react-router-dom";

export default function SideMenu() {
    return (
        <>
            <div className="side-menu-wrapper">
                <div className="side-bar-heading">
                    <h2>QRATE</h2>
                    <div className="side-bar-ui-theme">
                        <HiMoon />
                    </div>
                </div>
                <hr />
                <div className="side-menu-container">
                    <div className="side-menu-item">
                        <Link to={""}>Home</Link>
                    </div>
                    <div className="side-menu-item">
                        <Link to={""}>Home</Link>
                    </div>
                    <div className="side-menu-item">
                        <Link to={""}>Home</Link>
                    </div>
                    <div className="side-menu-item">
                        <Link to={""}>Home</Link>
                    </div>
                    <div className="side-menu-item">
                        <Link to={""}>Home</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
