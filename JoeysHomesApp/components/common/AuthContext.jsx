// AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

export const AuthContext = createContext();

//export const useAuth = () => {
//  return useContext(AuthContext);
//};

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
//export const AuthProvider = ({ children }) => {
//  const [state, dispatch] = useReducer(authReducer, initialState);
//
//  return (
//    <AuthContext.Provider value={{ state, dispatch }}>
//      {children}
//    </AuthContext.Provider>
//  );
//};
//
