import React from "react";
import { Link } from "react-router-dom";

const AsideMenu = ({ isLoggedIn, handleLogout }) => {
    return (
        <aside>
            <img className="menu-logo" src="../../../logo.png" alt="logo" />
            
            <ul>
                <li>
                    <Link to="/"><i className="fa-solid fa-house"></i>Home</Link>
                </li>
                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/messages"><i className="fa-solid fa-envelope"></i>Messages</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <li>
                        <Link to="/profile"><i className="fa-solid fa-user"></i>Profile</Link>
                    </li>
                )}
                {isLoggedIn ? (
                    <li>
                        <Link to="/" onClick={handleLogout}><i className="fa-solid fa-sign-out"></i>Logout</Link>
                    </li>
                ) : (
                    <li>
                        <Link to="/login"><i className="fa-solid fa-gear"></i>Login</Link>
                    </li>
                )}
            </ul>
        </aside>
    );
};

export default AsideMenu;
