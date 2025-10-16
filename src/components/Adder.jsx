import { useState } from "react";
import Value from "./Value";

const Adder = ({ name }) => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    return (
        <div
            className="border border-black border-2 rounded-4 mx-auto p-3 mt-3   bg-secondary-subtle"
            style={{ width: "fit-content" }}
        >
            <h1 className="text-center text-primary">{name || "ADD"}</h1>
            <div className="d-flex justify-content-between bg">
                <span className="badge bg-secondary fs-2">A={a}</span>
                <span className="badge bg-primary fs-2">A+B={a + b}</span>
                <span className="badge bg-secondary fs-2">B={b}</span>
            </div>
            <div className="d-flex justify-content-between gap-3">
                <Value name={'A'} value={a} setValue={setA} />
                <Value name={'B'} value={b} setValue={setB} />
            </div>
        </div>
    );
};

export default Adder;