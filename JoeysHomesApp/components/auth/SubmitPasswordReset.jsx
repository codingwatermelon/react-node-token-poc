
import React, { useState, useEffect } from "react";
//import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
//import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {
  useLoaderData,
  useNavigation,
  Form,
  useNavigate,
  Link
} from "react-router-dom"

import AuthService from "../../services/auth.service";

export default function ResetPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        AuthService.submitPasswordReset(email).then(
          (response) => {
            // For testing, will log this to console to form my /passwordreset? link so I don't have to waste emails
            console.log(response.data);
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      } catch(err) {
        //setUsername("")
        //setPassword("")

        if (err.name == "AxiosError") {
            if (err.response.status == 404 || err.response.status == 401) {
                // TODO In a real world scenario, I'd want to limit the number of attempts to access an account
                setMessage("Username or password is incorrect, try again")
                setSuccessful(false);
            }
        }
        else {
            //navigate(`/login?message=Wrong username or password&redirectTo=${pathname}`)
            setMessage(err.message)
            setSuccessful(false);
        }
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
      <h1>Enter the email linked to your account to receive a password reset request</h1>
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

      <Form 
        className="login-form"
        onSubmit={handleSubmit}
        replace
      >

      {!successful && (
        <>

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
        </>
      )}
      </Form>
      <Link 
          to="/"
          className="login-form-link">
              <p>Back to Home</p>
      </Link>
    </div>
  );
};

//export default Register;