import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const Applayout = ({ products, carts, setCartItems }) => {

    return (

        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppHeader />
            <AppNavbar products={products} carts={carts}/>
            <main style={{ flex: '1' }}>
                <Outlet context={{ products, carts, setCartItems }} />
            </main>
            <AppFooter />

        </div>

    );
}

export default Applayout;