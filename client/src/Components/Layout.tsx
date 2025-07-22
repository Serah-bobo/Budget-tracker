import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="container flex-1 px-4 py-8 mx-auto">
                <Outlet />
            </main>
        <Footer />
        </div>
    );
}
export default Layout;