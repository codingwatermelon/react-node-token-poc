import React, { useEffect } from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
    useNavigate,
    Link
} from "react-router-dom"
import { signupUser } from "../functions"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()

    const email = formData.get("email")
    const password = formData.get("password")
    const confirmpassword = formData.get("confirmpassword")

    if (password != confirmpassword) {
        return "Passwords don't match, try again"
    }

    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/"
    
    console.log("pathname (action)")
    console.log(pathname)

    try {
        const data = await signupUser({ email, password })
        console.log("data (Login client)")
        console.log(data)
        // TODO Do I need to get client info (email/password) returned here? Probably not
        // TODO Change 'loggedin' to fingerprint which ties to DB

        localStorage.setItem("loggedin", true)
        
        // TODO If user is logged in, then upon subsequent requests to login page, either stay on current page or go to some account settings page
        return redirect(pathname)
    } catch(err) {
        return err.message
    }
}

export default function Signup() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()
    const navigate = useNavigate();

    const isLoggedIn = (localStorage.getItem("loggedin") === "true")
    
    // Sign user out if user is logged in already and wants to register a new account for whatever reason
    if (isLoggedIn) {
        localStorage.setItem("loggedin", false)
    }
    else {
        // TODO I want to make the input fields disjointed like in a real world sign up page
        return (
            <div className="login-container">
                <h1>Register your account</h1>
                {message && <h3 className="red">{message}</h3>}
                {errorMessage && <h3 className="red">{errorMessage}</h3>}

                <Form 
                    method="post" 
                    className="login-form" 
                    replace
                >
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    <button
                        disabled={navigation.state === "submitting"}
                    >
                        {navigation.state === "submitting"
                            ? "Processing..."
                            : "Sign up"
                        }
                    </button>
                </Form>
            </div>   
        )
    }
}
