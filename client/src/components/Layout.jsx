import { useLocation } from "react-router-dom";
import Header from "./Header";
import AdminHeader from "./AdminHeader";

export const Layout = ({ children }) =>{
    const location = useLocation();

    const isAdminRoute = location.pathname.startsWith('/dashboard')|| location.pathname.startsWith('/editpage')

    return(
        <>
            {isAdminRoute ? <AdminHeader /> : <Header />}
            <main>{children}</main>
        </>
    )
}