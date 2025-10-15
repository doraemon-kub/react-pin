


import Value from "../components/Value";
import Temperature from "../components/Temperature";
import Timer from "../components/Timer";
import Adder from "../components/Adder";



const Components = () => {


     const [counter, setCounter] = useState(0);

    return ( <>
        <h2>COMPONENTS PAGES</h2>
            {/* <RedixCounter /> */}

      <Value name={'COUNTER'} value={counter} setValue={setCounter} />

      <Timer name={'TIMER'} />

      <Adder name={'ADD'} />

      <Temperature name={'TEMPERATURES'} />

      


      <h1 className="text-center mt-3">67156801 นายณัฐวุฒิ สังข์ประเสริฐ</h1>

    </> );
}
 
export default Components;