// AuthContext.js
import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

//export const AuthProvider = ({ children }) => {
//  const [state, dispatch] = useReducer(authReducer, initialState);
//
//  return (
//    <AuthContext.Provider value={{ state, dispatch }}>
//      {children}
//    </AuthContext.Provider>
//  );
//};

export const AuthProvider = ({ children }) => {
  //const [user, setUser] = useState(null);


  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // TODO Set initial state based on auth status from backend (because it resets to false if page is reloaded/refreshed or the url is modified manually)
  // Perhaps I need to use a useEffect here

  //useEffect(() => {
  //  async function fetchAuthStatus() {
  //      //await AuthService.login(token.email, "xxx")
  //      await AuthService.getAuthStatus()
  //      .then((response) => {
  //          loginAuth();
  //      })
  //      .catch((error) => {
  //          console.error("Error fetching user data: ", error);
  //      });
  //  }
  //  
  //  fetchAuthStatus();
  //
  //}, []);

  const loginAuth = (loginData) => {
    // Perform the login logic, then update the user in the context
    setIsAuthenticated(true);
  };

  const logoutAuth = () => {
    // Perform the logout logic, then update the user in the context to null
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

//const initialState = {
//  isAuthenticated: false,
//  user: null,
//};
//
//const authReducer = (state, action) => {
//  switch (action.type) {
//    case 'LOGIN':
//      console.log("login reducer")
//      return {
//        ...state,
//        isAuthenticated: true,
//        user: action.payload,
//      };
//    case 'LOGOUT':
//      console.log("logout reducer")
//      return {
//        ...state,
//        isAuthenticated: false,
//        user: null,
//      };
//    default:
//      return state;
//  }
//};
//

