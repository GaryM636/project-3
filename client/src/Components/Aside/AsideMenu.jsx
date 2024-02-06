import React from "react";
import { Link } from "react-router-dom";

const AsideMenu = () => {
    return (
        <aside className="aside-menu">
                <img className="menu-logo" src="../../../logo.png" alt="logo" />
            
            <ul>
                <li>
                    <Link to="/"><i className="fa-solid fa-house"></i>Home</Link>
                </li>
                <li>
                    <Link to="/discover"><i className="fa-solid fa-magnifying-glass"></i>Discover</Link>
                </li>
                <li>
                    <Link to="/notifications"><i className="fa-solid fa-circle-exclamation"></i>Notifications</Link>
                </li>
                <li>
                    <Link to="/messages"><i className="fa-solid fa-envelope"></i>Messages</Link>
                </li>
                <li>
                    <Link to="/profile"><i className="fa-solid fa-user"></i>Profile</Link>
                </li>
            </ul>
        </aside>
    );
};

export default AsideMenu;
