import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const Applayout = () => {
    return (

        <>
           <AppHeader/>
           <AppNavbar/>
           <Outlet/>
           <AppFooter/>

        </>

    );
}

export default Applayout;