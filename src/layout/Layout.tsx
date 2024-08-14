import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
    <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
        <Header />
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Layout
