import React, { useState, useEffect, useContext } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service";
import { AuthContext } from "./common/AuthContext";


export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    // TODO I think I need to not use this in so many different places, making too many requests??
    const { isAuthenticated, logoutAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log('header isauthenticated')
    console.log(isAuthenticated)

    const logOut = () => {
        AuthService.logout();
        logoutAuth();
        navigate("/");
    };
    
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
                    <button onClick={logOut}>
                        Log Out
                    </button>
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