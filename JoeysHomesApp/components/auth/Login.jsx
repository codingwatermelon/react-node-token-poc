import React, { useEffect, useState } from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
    useNavigate,
    Link
} from "react-router-dom"
import { loginUser } from "../../functions"
import { FiEye, FiEyeOff } from 'react-icons/fi'; // If using icons
import AuthService from "../../services/auth.service";

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    
    const username = formData.get("username")
    const password = formData.get("password")

    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/"
    
    console.log("pathname (action)")
    console.log(pathname)

    // TODO Validate fields are correct before proceeding
    const userNameRegex = /^[A-Za-z0-9]+$/g

    if (!(userNameRegex.test(username))) {
        console.log("username is invalid")
        return "Username is invalid"
    }

    try {
        //const data = await loginUser({ email, password })

        // TODO Do I need authservice.login to be an async function like above?
        const data = AuthService.login(username, password)
        
        window.location.href = pathname;
        //return redirect(pathname);

        
        // TODO Do I need to get client info (email/password) returned here? Probably not
        // TODO Change 'loggedin' to fingerprint which ties to DB
        //localStorage.setItem("token", true)
        // TODO If user is logged in, then upon subsequent requests to login page, either stay on current page or go to some account settings page
        
    } catch(err) {
        return err.message
    }
}

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()
    const navigate = useNavigate();

    const token = AuthService.getCurrentUser()
    console.log("curr token")
    console.log(token)

    // TODO verify token is valid (non expired and sufficient to access requested resources)

    // Redirect to account page if user is logged in already
    //if (isLoggedIn) {
    //    useEffect(() => { 
    //        navigate('/account');
    //    }, []);
    //}
    //else {
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
                        name="username"
                        type="string"
                        placeholder="Username"
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
                <Link 
                    to="/signup"
                    className="login-form-link">
                        <p>No account yet? Sign up here</p>
                </Link>
            </div>   
        )
    //}
}
