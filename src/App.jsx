// import RedixCounter from "./components/RedixCounter";

import { useState, useEffect, use } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Components from "./pages/Components";
import Home from "./pages/Home";
import Animation from "./pages/Animation";
import Calculator from "./pages/Calculator";
import ForwardToHome from "./pages/ForwardToHome";
import Applayout from "./layouts/AppLayout";
import Todos from "./pages/Todos";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

import { fetchProducts } from "./data/products";
import Login from "./pages/Login";

function App() {

    const [token, setToken] = useState('');   
    const [role, setRole] = useState('');

    const [products, setProducts] = useState([]);
    const [carts, setCartItems] = useState([]);

    useEffect(() => {
        setProducts(fetchProducts());
    }, []);

    useEffect(() => {
        console.log("Products loaded:", products);
    }, [products]);

    if (token === '') {
        return <Login setToken={setToken} setRole={setRole}/>;
    } else {
            
    }

    return (

        <BrowserRouter basename="/multipages">
            <Routes >
                <Route element={<Applayout products={products} carts={carts} setCartItems={setCartItems} setToken={setToken}/>}>
                    <Route path="components" element={<Components />} />
                    <Route path="home" element={<Home />} />
                    <Route path="animation" element={<Animation />} />
                    <Route path="calculator" element={<Calculator />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="product" element={<Product products={products} carts={carts} setCartItems={setCartItems} />} />
                    <Route path="cart" element={<Cart carts={carts} setCartItems={setCartItems}/>} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<ForwardToHome />} />

                </Route>


            </Routes>
        </BrowserRouter>

    );




}

export default App;
