import React, { useState } from "react"
import Outlet, { useLoaderData, useOutlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { AuthContext } from "./common/AuthContext";

export default function Layout() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const changeHeader = () => {
        setIsAuthenticated(!isAuthenticated);
    };

    return (
        
        <div className="site-wrapper">
        <AuthContext.Provider value={{ isAuthenticated, changeHeader }}>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
        </AuthContext.Provider>
        </div>
    )
}
//export const AuthLayout = () => {
//    const outlet = useOutlet();
//
//    return (
//        <AuthProvider>
//            <Header/>
//            {outlet}
//            <Footer/>
//        </AuthProvider>
//    );
//}