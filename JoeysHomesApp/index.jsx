import React from 'react';
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
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login"
import Layout from "./components/Layout"
import Error from "./components/Error"
//import { requireAuth } from "./utils"
import Dashboard from "./pages/Default/Dashboard"
import Income from "./pages/Default/Income"
import DefaultLayout from "./components/DefaultLayout"


//import "./server"
//import "../JoeysHomesServer/server"

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
      path="login"
      element={<Login />}
      loader={loginLoader}
      action={loginAction}
    />
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
    />
    

    <Route path="*" element={<NotFound />} />
  </Route>
))

//<Route
//      path="login"
//      element={<Login />}
//      loader={loginLoader}
//      action={loginAction}
//    />

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);