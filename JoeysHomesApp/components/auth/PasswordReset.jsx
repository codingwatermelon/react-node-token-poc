
import React, { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import {
  useNavigation,
  Form,
  Link
} from "react-router-dom"

import AuthService from "../../services/auth.service";

export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [completed, setCompleted] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  // Set accessToken and refreshToken headers based on search params, given link from email
  const username = searchParams.get("username");
  const accessToken = searchParams.get("accessToken");

  // Called upon form submit
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password.length < 6 || password.length > 40) {
      setMessage("The password must be between 6 and 40 characters.");
    }
    else if (password != confirmPassword) {
      setMessage("Passwords don't match, try again.");
    }

    try {
        const res = await AuthService.changePassword(
                              username,
                              password,
                              accessToken
                            );
        
        // completed vs successfully completed yield different messages to end user
        if (res.status == 200) {
          setSuccessful(true);
        }

        setMessage(res.data.message);
        setCompleted(true)
        
    }
    catch(err) {
      return err.message
    } 
    
  };

  return (
    <div className="login-container">
      {message && (
            <h3>
              {message}
            </h3>
        )}

      {username &&
       accessToken &&
       !completed ? (
        <>
        <h3>Changing password for user {username}</h3>
        <Form 
          className="login-form"
          onSubmit={handleChangePassword}
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
                    ? "Changing password..."
                    : "Change password"
                }
            </button>
          </Form>
        </>
      ) :
      !successful ? 
      (
        <h3>If you want to reset your password, <a href="/submitpasswordreset">submit a request to do so here TODO link</a></h3>
      )
      :
      (
        <></>
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