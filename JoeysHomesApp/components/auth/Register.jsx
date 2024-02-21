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

//const Register = (props) => {
export default function Register() {
  //const form = useRef();
  //const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState(["defaultvalue"]);

  const navigation = useNavigation();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const required = (value) => {
    if (!value) {
      return "This field is required!";
    }
    else {
      return ""
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return "This is not a valid email.";
    }
    else {
      return ""
    }
  };
  
  const vusername = (value) => {
    const userNameRegex = /^[A-Za-z0-9]+$/g

    if (value.length < 3 || value.length > 20) {
      return "The username must be between 3 and 20 characters.";
    }
    else if (!(userNameRegex.test(username))) {
      return "Username can only be letters and numbers";
    }
    else {
      return "";
    }

  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return "The password must be between 6 and 40 characters.";
    }
    else {
      return ""
    }
  };

  useEffect(() => {
    if (validationMessage.every(element => element === "")) {
      try {
        AuthService.register(username, email, password).then(
          (response) => {
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
                //navigate(`/register?message=Wrong username or password&redirectTo=${pathname}`)
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


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    // Validate form fields
    setValidationMessage([vusername(username), validEmail(email), vpassword(password)]);

    //if (message === "") {
    //  // Run register request
    //  try {
    //    AuthService.register(username, email, password).then(
    //      (response) => {
    //        setMessage(response.data.message);
    //        setSuccessful(true);
    //      },
    //      (error) => {
    //        const resMessage =
    //          (error.response &&
    //            error.response.data &&
    //            error.response.data.message) ||
    //          error.message ||
    //          error.toString();
//
    //        setMessage(resMessage);
    //        setSuccessful(false);
    //      }
    //    );
    //  } catch(err) {
    //    //setUsername("")
    //    //setPassword("")
//
    //    if (err.name == "AxiosError") {
    //        if (err.response.status == 404 || err.response.status == 401) {
    //            // TODO In a real world scenario, I'd want to limit the number of attempts to access an account
    //            //navigate(`/register?message=Wrong username or password&redirectTo=${pathname}`)
    //            setMessage("Username or password is incorrect, try again")
    //            setSuccessful(false);
    //        }
    //    }
    //    else {
    //        //navigate(`/login?message=Wrong username or password&redirectTo=${pathname}`)
    //        setMessage(err.message)
    //        setSuccessful(false);
    //    }
    //  }
    //}
  };

  return (
    <div className="login-container">
        <Form 
          className="login-form"
          onSubmit={handleRegister}
          replace
        >

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

        {!successful && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
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