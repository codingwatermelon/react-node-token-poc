import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"
import About from "./pages/About"
import Maintenance, { loader as maintenanceLoader }  from "./pages/Maintenance/Maintenance"
import Houses, { loader as housesLoader } from "./pages/Houses/Houses"
import HouseDetail, { loader as houseDetailLoader } from "./pages/Houses/HouseDetail"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import Error from "./components/Error"
//import { requireAuth } from "./utils"
import Dashboard from "./pages/Default/Dashboard"
import Income from "./pages/Default/Income"
import DefaultLayout from "./components/DefaultLayout"

//import Login, { loader as loginLoader, action as loginAction } from "./pages/old_Login"
//import Signup, { loader as signupLoader, action as signupAction } from "./pages/old_Signup"
import Profile from "./components/auth/Profile"
//import Login, { loader as loginLoader, action as loginAction } from "./components/auth/Login"
import Login, { loader as loginLoader } from "./components/auth/Login"
import Register from "./components/auth/Register"

import HouseDetailMaintenance, { loader as houseDetailMaintenanceLoader } from "./pages/Houses/HouseDetailMaintenance"
import HouseDetailInfo from "./pages/Houses/HouseDetailInfo"

//import "./server"
//import "../JoeysHomesServer/server"

// TODO Add usecontext here so that I can pass it into the login action?

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<DefaultLayout />} >
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path="income"
          element={<Income />}
        />
      </Route>
      <Route path="about" element={<About />} />
      <Route
        path="maintenance"
        element={<Maintenance />}
        errorElement={<Error />}
        loader={maintenanceLoader}
      />
      <Route
        path="houses"
        element={<Houses />}
        errorElement={<Error />}
        loader={housesLoader}
      />
      <Route 
        path="houses/:id" 
        element={<HouseDetail />} 
        errorElement={<Error />}
        loader={houseDetailLoader}
      >
        <Route
          index
          element={<HouseDetailInfo />}
        />
        <Route
          path="maintenance"
          element={<HouseDetailMaintenance />}
          loader={houseDetailMaintenanceLoader}
        />
      </Route>
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
      />
      <Route 
        path="register"
        element={<Register />} 
        errorElement={<Error />}
      />
      <Route exact path="/profile" element={<Profile />} />
      
  
      <Route path="*" element={<NotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );