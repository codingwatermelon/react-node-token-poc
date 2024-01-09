import React from "react"
import { useRouteError, isRouteErrorResponse } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    
    console.log(error)

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
            return (
                <>
                <h1>Your session has timed out.</h1>
                <Link
                    to="/login"
                >
                    <h2>Click here to log in again</h2>
                </Link>
                </>
            )
        }
    }
}