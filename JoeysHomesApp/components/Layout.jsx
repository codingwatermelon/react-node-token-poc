import React from "react"
import { useLoaderData, useOutlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

import { AuthProvider } from "./common/AuthContext"

//export default function Layout() {
//    return (
//        <AuthProvider>
//            <Header />
//            <main>
//                <Outlet />
//            </main>
//            <Footer />
//        </AuthProvider>
//    )
//}
export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthProvider>
            <Header/>
            {outlet}
            <Footer/>
        </AuthProvider>
    );
}