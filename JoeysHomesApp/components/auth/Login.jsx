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

//import { AuthContext } from '../common/AuthContext';
import { useAuth } from "../common/AuthContext"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

// TODO I probably need to change this because 
// 1) I can't call useAuth because of the Rules of Hooks
// 2) this runs upon every "action", so I can't put in a password eye thing either
// Perhaps I can modify action so that I can add a password eye thing
// Also, probably shouldn't load this if the user is logged in anyways

// TODO, create other function to be called when submit button is clicked, then call handleLogin from perplexity code
//export async function action({ request }) {
////export const action = (context) => async ({ request }) => {
//
//    const formData = await request.formData()
//    
//    const username = formData.get("username")
//    const password = formData.get("password")
//    
//    const pathname = new URL(request.url)
//        .searchParams.get("redirectTo") || "/"
//    
//    console.log("pathname (action)")
//    console.log(pathname)
//
//    // TODO Validate fields are correct before proceeding
//    const userNameRegex = /^[A-Za-z0-9]+$/g
//
//    if (!(userNameRegex.test(username))) {
//        console.log("username is invalid")
//        return "Username can only be letters and numbers"
//    }
//
//    try {
//        const data = await AuthService.login(username, password)
//
//        // TODO Check if data is valid, then setIsAuthenticated accordingly
//
//        console.log("data from login")
//        console.log(data)
//
//        
//        
//
//        return redirect(pathname);
//        //return "test"
//
//        
//        // TODO Do I need to get client info (email/password) returned here? Probably not
//        // TODO Change 'loggedin' to fingerprint which ties to DB
//        //localStorage.setItem("token", true)
//        // TODO If user is logged in, then upon subsequent requests to login page, either stay on current page or go to some account settings page
//        
//    } catch(err) {
//        if (err.name == "AxiosError") {
//            if (err.response.status == 404) {
//                // TODO In a real world scenario, I'd want to limit the number of attempts to access an account
//                return "Username or password is incorrect, try again"
//            }
//        }
//        else {
//            return err.message
//        }
//    }
//}

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()
    const navigate = useNavigate();
    const location = useLocation();

    const token = AuthService.getCurrentUser()
    console.log("curr token")
    console.log(token)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //const { isAuthenticated, changeHeader } = useContext(AuthContext);
    const { loginAuth } = useAuth();

    console.log("errorMessage")
    console.log(errorMessage)

    if (errorMessage == "test") {
        return redirect("/")
    }

    //useEffect(() => {
    //    if (isAuthenticated) {
    //        const baseUrl = 'http://192.168.64.3:5173'
    //        const pathname = new URL(location.pathname, baseUrl)
    //        .searchParams.get("redirectTo") || "/"
//
    //        navigate(pathname);
    //    }
    //}, [navigate, isAuthenticated]);

    // After the user submits the login form
    // TODO redirect doesn't seem to be working. Tried changing this from const to function
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
            // TODO error handling here
            const data = await AuthService.login(username, password)

            // TODO Check if data is valid, then setIsAuthenticated accordingly

            console.log("data from login")
            console.log(data)

            // Set isAuthenticated context for usage in Header etc.
            loginAuth(username, password)
            
            // If the login is successful, dispatch a LOGIN action with the user data
            //dispatch({ type: 'LOGIN', payload: { username } });
            
            // This refreshes the window, but not state. Header still says "Login" instead of showing the current user's name
            //window.location.reload();
            console.log("pathname to redirect")
            console.log(pathname)
            
            // Now I just need to fix redirecting after successful auth
            //return redirect(pathname);
            navigate(pathname);

            
            // TODO Do I need to get client info (email/password) returned here? Probably not
            // TODO Change 'loggedin' to fingerprint which ties to DB
            //localStorage.setItem("token", true)
            // TODO If user is logged in, then upon subsequent requests to login page, either stay on current page or go to some account settings page
            
        } catch(err) {
            if (err.name == "AxiosError") {
                if (err.response.status == 404) {
                    // TODO In a real world scenario, I'd want to limit the number of attempts to access an account
                    return "Username or password is incorrect, try again"
                }
            }
            else {
                return err.message
            }
        }
        
    };

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
                        // TODO if I use onClick={handleLogin} it doesn't work either
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
