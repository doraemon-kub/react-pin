import React, { useRef } from "react"; 
import { Form } from "react-bootstrap";
import { verifyUser } from "../data/users";

const Login = ({ setToken, setRole }) => {
    const userRef = useRef();
    const passRef = useRef();


    const handleLogin = () => {
        const user = userRef.current.value.trim(); 
        const pass = passRef.current.value.trim();
        userRef.current.value = '';
        passRef.current.value = '';

        const userInfo = verifyUser(user, pass);

        if (userInfo === null) {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"); 
            userRef.current.focus();
        } else {
            setToken(userInfo.token);
            setRole(userInfo.role);
        }
    };

    return (
        <div className="text-center">
            <div className="text-center m-5 p-5 border border-2 rounded-3 shadow-lg d-inline-block">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    id="username"
                    placeholder="user"
                    ref={userRef}
                />

                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="password"
                    placeholder="pass"
                    ref={passRef}
                />

                
                <button className="btn btn-success mt-3" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}

// 4. ลบบรรทัดที่เป็นคอมเมนต์อยู่นอก Component ออก
export default Login;