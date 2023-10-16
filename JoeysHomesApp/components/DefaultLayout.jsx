import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function DefaultLayout() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Reports
                </NavLink>

            </nav>
            <Outlet />
        </>
    )
}