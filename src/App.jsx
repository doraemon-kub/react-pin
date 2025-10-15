// import RedixCounter from "./components/RedixCounter";

import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Components from "./pages/Components";
import Calculater from "./pages/Calculater";
import ForwardToHome from "./pages/ForwardToHome";
import AppLayouts from "./layouts/AppLayout";

function App() {
  return (
    <div>
      <BrowserRouter basename="/redix-counter/">
        <Route>
          <Route element={<AppLayouts/>}>
            <Route path="components" element={<Components />} />
            <Route path="animation" element={<Animation />} />
            <Route path="calculater" element={<Calculater />} />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
