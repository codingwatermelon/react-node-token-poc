import React from "react"
import { Link, useRouteError, isRouteErrorResponse, useLocation } from "react-router-dom"
import { useAuth } from "./common/AuthContext"

export default function Error() {
    const error = useRouteError()
    const { logoutAuth } = useAuth();

    const defaultError = (
        <>
        <h1>Error: {error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
        </>
    )

    // Handle router errors
    if (isRouteErrorResponse(error)) {
        return (
            <>
            {defaultError}
            </>
        )
    }
    else {
        // If error is 403 Forbidden, then route user back to Login and mention that their session has timed out
        if ('response' in error) {
            if (error.response.status == 403) {
                const location = `/login?message=Session expired&redirectTo=${useLocation().pathname}`;
                logoutAuth()
                return (
                    <div className="session-expired">
                        <h1>Your session has timed out.</h1>
                        <Link
                            to={location}
                        >
                            <h2>Click here to log in again</h2>
                        </Link>
                    </div>
                )
            }
        }
        else {
            return (
                <>
                {defaultError}
                </>
            )
        }
    }
}