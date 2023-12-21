import React from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
    useNavigate
} from "react-router-dom"
import { loginUser } from "../api"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/"
    
    console.log("pathname (action)")
    console.log(pathname)
    try {
        const data = await loginUser({ email, password })
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

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()

    const isLoggedIn = (localStorage.getItem("loggedin") === "true")
    const navigate = useNavigate();
    
    // Redirect to account page if user is logged in already
    if (isLoggedIn) {
        navigate('/account'); // Redirect to new page
    }
    else {
        return (
            <div className="login-container">
                <h1>Sign in to your account</h1>
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
                    <button
                        disabled={navigation.state === "submitting"}
                    >
                        {navigation.state === "submitting"
                            ? "Logging in..."
                            : "Log in"
                        }
                    </button>
                </Form>
            </div>   
        )
    }
}
