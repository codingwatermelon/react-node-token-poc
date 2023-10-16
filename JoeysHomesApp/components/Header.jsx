import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }
    
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
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
}