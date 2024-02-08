import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import { AuthContext } from "./common/AuthContext";

export default function Layout() {

//    const [isAuthenticated, setIsAuthenticated] = useState(false);
//
//    const changeHeader = () => {
//        setIsAuthenticated(!isAuthenticated);
//    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function fetchAuthStatus() {
            //await AuthService.login(token.email, "xxx")
            await AuthService.getAuthStatus()
            .then((response) => {
                loginAuth();
            })
            .catch((error) => {
                console.error("Error fetching user data: ", error);
            });
        }
        
        fetchAuthStatus();
      
    }, []);
    
    const loginAuth = (loginData) => {
        // Perform the login logic, then update the user in the context
        setIsAuthenticated(true);
    };

    const logoutAuth = () => {
        // Perform the logout logic, then update the user in the context to null
        setIsAuthenticated(false);
    };

    return (
        
        <div className="site-wrapper">
        <AuthContext.Provider value={{ isAuthenticated, loginAuth, logoutAuth }}>
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