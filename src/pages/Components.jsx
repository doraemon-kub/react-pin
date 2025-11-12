import { useState } from "react";

import Value from "../components/Value";
import Temperature from "../components/Temperature";
import Timer from "../components/Timer";
import Adder from "../components/Adder";
import RedixCounter from "../components/RedixCounter";



const Components = () => {


     const [counter, setCounter] = useState(0);

    return ( <div className="bg-danger-subtle">
        
      <RedixCounter />

      <Value name={'COUNTER'} value={counter} setValue={setCounter} />

      <Timer name={'TIMER'} />

      <Adder name={'ADD'} />

      <Temperature name={'TEMPERATURES'} />

      


      <h1 className="text-center mt-3 bg-danger-subtle">67156801 นายณัฐวุฒิ สังข์ประเสริฐ</h1>

    </div> );
}
 
export default Components;