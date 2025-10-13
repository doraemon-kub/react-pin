// import RedixCounter from "./components/RedixCounter";

import "./App.css";
import Temperature from "./components/Temperature";
import Timer from "./components/Timer";
import Value from "./components/Value";
import Adder from "./components/Adder";

import { useState } from "react";

function App() {

  const [counter, setCounter] = useState(0);

  return (
    <div>
      {/* <RedixCounter /> */}

      <Value name={'COUNTER'} value={counter} setValue={setCounter} />

      <Timer name={'TIMER'} />

      <Adder name={'ADD'} />

      <Temperature name={'TEMPERATURES'} />

      


      <h1 className="text-center mt-3">67156801 นายณัฐวุฒิ สังข์ประเสริฐ</h1>
    </div>
  );
}

export default App;