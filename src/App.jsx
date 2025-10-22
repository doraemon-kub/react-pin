// import RedixCounter from "./components/RedixCounter";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Components from "./pages/Components";
import Home from "./pages/Home";
import Animation from "./pages/Animation";
import Calculator from "./pages/Calculator";
import ForwardToHome from "./pages/ForwardToHome";
import Applayout from "./layouts/AppLayout";
import Todos from "./pages/Todos";



function App() {

  return (

    <BrowserRouter basename="/multipages">
      <Routes >
        <Route element={<Applayout/>}>
          <Route path="components" element={<Components />} />
          <Route path="home" element={<Home />} />
          <Route path="animation" element={<Animation />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="todos" element={<Todos/>} />
          <Route path="*" element={<ForwardToHome />} />

        </Route>


      </Routes>
    </BrowserRouter>

  );
}

export default App;
