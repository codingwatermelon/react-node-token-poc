import React from "react"
import { Link, useRouteError, isRouteErrorResponse, useLocation } from "react-router-dom"

export default function Error() {
    const error = useRouteError()

    // Handle router errors
    if (isRouteErrorResponse(error)) {
        return (
            <>
            <h1>Error: {error.message}</h1>
            <pre>{error.status} - {error.statusText}</pre>
            </>
        )
    }
    else {
        // If error is 403 Forbidden, then route user back to Login and mention that their session has timed out
        if (error.response.status == 403) {
            const location = `/login?message=Session expired&redirectTo=${useLocation().pathname}`;
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
}