import React, { useState, useEffect, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import AuthService from "../services/auth.service";

import { AuthContext } from "./common/AuthContext";


export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    const { test } = useContext(AuthContext);

    // TODO This is returning as undefined
    // I think I need to revamp this whole thing lol
    console.log('header isauthenticated')
    console.log(test.isAuthenticated)

    // TODO When I press 'Log in' from /login, I need the Header component to update with the new current user
    // Currently, only the setCurrentUser(undefined) in the logOut method is updating the Header component properly
    //const [currentUser, setCurrentUser] = useState(undefined);

    // This useEffect runs on the first render of the page (i.e., also if the page gets reloaded)
    // I need this to run every time the currentUser changes. If I put currentUser as a dependency, then this runs in an infinite loop
//    useEffect(() => {
//        const user = AuthService.getCurrentUser();
//
//        if (user) {
//            setCurrentUser(user);
//            //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
//            //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
//        }
//
//    }, []);
//
//    const logOut = () => {
//        AuthService.logout();
//        //setShowModeratorBoard(false);
//        //setShowAdminBoard(false);
//        setCurrentUser(undefined);
//    };
    
    return (
        <header>
            <Link className="site-logo" to="/">Joey's Homes</Link>
            <nav>
                <NavLink 
                    to="maintenance"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Maintenance
                </NavLink>
                <NavLink 
                    to="houses"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Houses
                </NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src="../assets/images/avatar-icon.png" 
                        className="login-icon"
                    />
                </Link>
                {isAuthenticated ? (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                        TODO Username
                    </Link>
                    </li>
                    <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logout}>
                        LogOut
                    </a>
                    </li>
                </div>
                ) : (
                <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                        Login
                    </Link>
                    </li>

                    <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                        Sign Up
                    </Link>
                    </li>
                </div>
                )}

            </nav>
        </header>
    )
}