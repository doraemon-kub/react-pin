import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const Applayout = () => {
    return (

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppHeader />
            <AppNavbar />
            <main style={{ flex: '1' }}>
                <Outlet />
            </main>
            <AppFooter />

        </div>

    );
}

export default Applayout;