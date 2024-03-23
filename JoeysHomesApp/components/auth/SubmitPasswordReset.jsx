
import React, { useState, useEffect } from "react";
import { isEmail } from "validator";
import {
  useNavigation,
  Form,
  Link
} from "react-router-dom"

import AuthService from "../../services/auth.service";

export default function SubmitPasswordReset() {
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState(["defaultvalue"]);

  const navigation = useNavigation();
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return "This is not a valid email.";
    }
    else {
      return ""
    }
  };

  useEffect(() => {
    if (validationMessage.every(element => element === "")) {
      try {
        AuthService.submitPasswordReset(email)
        .then(
          (response) => {
            // For testing, I can log this to console to form my /passwordreset? link so I don't have to waste emails
            console.log(response.data);
            if (response.status == 429) {
              setMessage("Password request already sent recently, try again in 5 minutes from the time you first requested a new password.")
              setSuccessful(false);
            }
            else {
              setMessage(response.data.message);
              setSuccessful(true);
            }
          },
          (error) => {
            let resMessage = ""
            console.log(error)
            if (error.response.status == 429) {
              resMessage = "Password request already sent recently, try again in 5 minutes from the time you first requested a new password."
            }
            else {
              resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            }

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      } catch(err) {
        setMessage(err.message)
        setSuccessful(false);
      }
    }
}, [validationMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // Validate form fields
    setValidationMessage([validEmail(email)]);
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

      {successful ? (
        <>
        <h2>Check your email for password reset instructions</h2>
        </>
      ) :
      (
        <>
        <h2>Enter the email linked to your account to receive a password reset request</h2>
        <Form 
          className="login-form"
          onSubmit={handleSubmit}
          replace
        >

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
                disabled={navigation.state === "submitting"}
                type="submit"
            >
                {navigation.state === "submitting"
                    ? "Submitting..."
                    : "Submit"
                }
          </button>
        </Form>
        </>
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