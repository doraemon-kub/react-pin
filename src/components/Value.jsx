const Value = ({ name, type, value, setValue }) => {
    const handleDecrement = () => {
        if (type === "real") {
            setValue(parseFloat((value - 0.1).toFixed(2))); // ลดทีละ 0.1 และตัดทศนิยม 2 ตำแหน่ง
        } else {
            setValue(value - 1);
        }
    };

    const handleIncrement = () => {
        if (type === "real") {
            setValue(parseFloat((value + 0.1).toFixed(2))); // เพิ่มทีละ 0.1 และตัดทศนิยม 2 ตำแหน่ง
        } else {
            setValue(value + 1);
        }
    };

    return (
        <div
            className="border border-black border-2 rounded-4 mx-auto mt-3 p-2 bg-secondary-subtle"
            style={{ width: "fit-content" }}
        >
            <h1 className="text-primary text-center">{name || "VALUE"}</h1>
            <div className="d-flex justify-content-between gap-3 mt-1">
                <button className="btn btn-danger px-3" onClick={handleDecrement}>
                    &minus;
                </button>
                <span className="fw-bold fs-2">
                    {type === "real" ? value.toFixed(2) : Math.floor(value)}
                </span>
                <button className="btn btn-success px-3" onClick={handleIncrement}>
                    +
                </button>
            </div>
        </div>
    );
};

export default Value;
