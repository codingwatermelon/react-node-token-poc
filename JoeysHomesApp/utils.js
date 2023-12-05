import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin")

    console.log("isLoggedIn")
    console.log(isLoggedIn)
    console.log(typeof isLoggedIn)

    let loggedin = (isLoggedIn === "true"); 

    console.log("loggedin")
    console.log(loggedin)
    console.log(typeof loggedin)

    if (!loggedin) {
        console.log("not logged in, pathname")
        console.log(pathname)
        // TODO Figure out why this isn't working
        //return
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
}
