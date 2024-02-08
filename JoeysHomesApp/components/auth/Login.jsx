import React, { useEffect, useState, useContext } from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
    useNavigate,
    useLocation,

    Link
} from "react-router-dom"
import { loginUser } from "../../functions"
import { FiEye, FiEyeOff } from 'react-icons/fi'; // If using icons
import AuthService from "../../services/auth.service";

import { useAuth } from "../common/AuthContext"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export default function Login() {
    const message = useLoaderData()
    const navigation = useNavigation()
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, loginAuth } = useAuth();

    // Redirect to account page if user is logged in already
    useEffect(() => {
        if (isAuthenticated === true) {
            navigate('/profile');
        }
    }, []);

    const token = AuthService.getCurrentUser()
    console.log("curr token")
    console.log(token)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // After the user submits the login form
    const handleLogin = async (e) => {
        e.preventDefault();
        // Perform the login logic, for example, by calling an authentication API
        const userNameRegex = /^[A-Za-z0-9]+$/g
        
        const pathname = new URLSearchParams(window.location.search)
            .get("redirectTo") || "/"
        
        if (!(userNameRegex.test(username))) {
            console.log("username is invalid")
            return "Username can only be letters and numbers"
        }

        try {
            // TODO more error handling here
            const data = await AuthService.login(username, password)

            // TODO Check if data is valid, then setIsAuthenticated accordingly

            console.log("data from login")
            console.log(data)

            // Set isAuthenticated context for usage in Header etc.
            loginAuth(username, password)
        
            navigate(pathname);

        } catch(err) {
            console.log("caught error in login")
            setUsername("")
            setPassword("")

            if (err.name == "AxiosError") {
                if (err.response.status == 404 || err.response.status == 401) {
                    // TODO In a real world scenario, I'd want to limit the number of attempts to access an account
                    navigate(`/login?message=Wrong username or password&redirectTo=${pathname}`)
                    return "Username or password is incorrect, try again"
                }
            }
            else {
                navigate(`/login?message=Wrong username or password&redirectTo=${pathname}`)
                return err.message
            }
        }
        
    };

    console.log("isAuthenticated")
    console.log(isAuthenticated)

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}

            <Form 
                method="post" 
                className="login-form"
                onSubmit={handleLogin}
                replace
            >
                <input
                    name="username"
                    type="string"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    disabled={navigation.state === "submitting"}
                    type="submit"
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
}
