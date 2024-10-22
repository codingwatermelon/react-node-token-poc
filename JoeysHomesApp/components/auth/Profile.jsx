import React, { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useAuth } from "../common/AuthContext"

// TODO Fix styling for this component

export default function Profile() {
  const currentUser = AuthService.getCurrentUser();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, []);

  const resetPassword = () => {
    navigate("/submitpasswordreset");
};

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Roles:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <button
          disabled={navigation.state === "submitting"}
          type="submit"
          onClick={resetPassword}
      >
          {navigation.state === "submitting"
              ? "Submitting password reset request..."
              : "Reset Password"
          }
      </button>
    </div>
  );

}