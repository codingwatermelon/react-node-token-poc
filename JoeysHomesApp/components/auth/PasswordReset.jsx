
import React, { useState, useEffect } from "react";
//import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
//import CheckButton from "react-validation/build/button";
import { useSearchParams } from 'react-router-dom';
import { isEmail } from "validator";
import {
  useLoaderData,
  useNavigation,
  Form,
  useNavigate,
  Link
} from "react-router-dom"

import AuthService from "../../services/auth.service";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState(["defaultvalue"]);
  const [searchParams] = useSearchParams();

  // TODO If local tokens are invalid (e.g., tokens expired or user not logged in), then ask user if they want to reset their password and have link to redirect them to /submitpasswordreset or otherwise login

  // TODO Change this so that authStatus is not being called (this route does not need to be protected)

  // If templogin succeeds, then proceed with password reset -- otherwise, don't allow password resets

  // TODO Need to figure out how to pass username etc in quotes in search params
  // e.g., http://192.168.64.3:5173?username="test@test.com"&accessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywia…yOTB9.5i1UBtWzUPt7jtxLizeO579tK9bxpvL_GDwGSL0FrUE"&refreshToken="e8853ee3-3e98-4e91-9add-c6e58d1d7a15"

  const navigation = useNavigation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        // Set accessToken and refreshToken headers based on search params using AuthService.templogin, given from email
        // TODO setReady if all search params below are present
        const data = await AuthService.templogin(
                              username=searchParams.get("username"), 
                              accessToken=searchParams.get("accessToken"), 
                              refreshToken=searchParams.get("refreshToken")
                            )

        // TODO Check if data is valid, then setIsAuthenticated accordingly

        console.log("data from login")
        console.log(data)

        // Set isAuthenticated context for usage in Header etc.
        //loginAuth(username, password)
    
        //navigate(pathname);

    }
    catch(err) {
      return err.message
    } 
    //catch(err) {
    //  
    //    if (err.name == "AxiosError") {
    //        if (err.response.status == 404 || err.response.status == 401) {
    //            // TODO In a real world scenario, I'd want to limit the number of attempts to access an account
    //            navigate(`/login?message=Wrong username or password&redirectTo=${pathname}`)
    //            return "Username or password is incorrect, try again"
    //        }
    //    }
    //    else {
    //        navigate(`/login?message=Wrong username or password&redirectTo=${pathname}`)
    //        return err.message
    //    }
    //}
    
  };

  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return "The password must be between 6 and 40 characters.";
    }
    else if (value != confirmPassword) {
      return "Passwords don't match, try again."
    }
    else {
      return ""
    }
  };


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // Validate form fields
    //setValidationMessage([vpassword(password)]);

  };

  return (
    <div className="login-container">
      {message && (
            <h3>
              {message}
            </h3>
        )}

      {validationMessage[0] != "defaultvalue" && (
        <>
          {validationMessage.map((item, i) => (
            <div key={i}>
            <h3>
              {item}
            </h3>
            </div>
          ))}
        </>
      )}

      {searchParams.get("username") &&
       searchParams.get("accessToken") &&
       searchParams.get("refreshToken") ? (
        <>
        <h3>Changing password for user</h3>
        <Form 
        className="login-form"
        onSubmit={handleRegister}
        replace
        >
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
                disabled={navigation.state === "submitting"}
                type="submit"
            >
                {navigation.state === "submitting"
                    ? "Signing up..."
                    : "Sign up"
                }
            </button>
          </Form>
        </>
      ) :
      (
        <h3>If you want to reset your password, <a href="/submitpasswordreset">submit a request to do so here TODO link</a></h3>
      )
      }
      
      <Link 
          to="/"
          className="login-form-link">
              <p>Back to Home</p>
      </Link>
    </div>
  );
};

//export default Register;