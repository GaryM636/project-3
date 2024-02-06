import React from "react";
import { Link } from "react-router-dom";

const AsideMenu = () => {
    return (
        <aside className="aside-menu">
                <img className="menu-logo" src="../../../public/logo.png" alt="logo" />
            
            <ul>
                <li>
                    <Link to="/"><i class="fa-solid fa-house"></i>Home</Link>
                </li>
                <li>
                    <Link to="/discover"><i class="fa-solid fa-magnifying-glass"></i>Discover</Link>
                </li>
                <li>
                    <Link to="/notifications"><i class="fa-solid fa-circle-exclamation"></i>Notifications</Link>
                </li>
                <li>
                    <Link to="/messages"><i class="fa-solid fa-envelope"></i>Messages</Link>
                </li>
                <li>
                    <Link to="/profile"><i class="fa-solid fa-user"></i>Profile</Link>
                </li>
            </ul>
        </aside>
    );
};

export default AsideMenu;
