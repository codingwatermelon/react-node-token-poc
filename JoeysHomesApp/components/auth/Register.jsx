import React, { useState, useRef } from "react";
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
      return "This field is required!\n"
    }
    else {
      return ""
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return "This is not a valid email.\n"
    }
    else {
      return ""
    }
  };
  
  const vusername = (value) => {
    const userNameRegex = /^[A-Za-z0-9]+$/g

    if (value.length < 3 || value.length > 20) {
      return "The username must be between 3 and 20 characters.\n"
    }
    else if (!(userNameRegex.test(username))) {
      return "Username can only be letters and numbers\n";
    }
    else {
      return ""
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return "The password must be between 6 and 40 characters.\n";
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
    setMessage(vusername(username) + validEmail(email) + vpassword(password));

    if (message == "") {
      // Run register request
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
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form 
          onSubmit={handleRegister}
          replace
        >

          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          {/* TODO Add "Back to Home" button upon successful registration

          <CheckButton style={{ display: "none" }} ref={checkBtn} />*/}
        </Form>
        <Link 
            to="/"
            className="login-form-link">
                <p>Back to Home</p>
        </Link>
      </div>
    </div>
  );
};

//export default Register;