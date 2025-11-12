import React, { useRef } from "react";
// 1. Import Card และ Button มาใช้
import { Form, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { verifyUser } from "../data/users";

const Login = ({ setToken, setRole }) => {
    const userRef = useRef();
    const passRef = useRef();

    // 2. ปรับ handleLogin ให้รับ event จาก Form
    const handleLogin = (event) => {
        // 3. ป้องกันหน้าเว็บโหลดใหม่ (Refresh)
        event.preventDefault();

        const user = userRef.current.value.trim();
        const pass = passRef.current.value.trim();

        const userInfo = verifyUser(user, pass);

        if (userInfo === null) {
            alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            userRef.current.focus();
        } else {
            // ล้างค่าในช่อง input (ควรทำหลังจาก Login สำเร็จ)
            userRef.current.value = '';
            passRef.current.value = '';

            setToken(userInfo.token);
            setRole(userInfo.role);
        }
    };

    return (
        // 4. เปลี่ยนวิธีจัดกลาง
        // ใช้ Flexbox จัดให้อยู่กลางจอทั้งแนวตั้ง-แนวนอน
        // และเพิ่มสีพื้นหลังเทาอ่อนๆ ให้กับหน้า
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#f8f9fa' }}
        >

            {/* 5. ใช้ <Card> แทน <div> ธรรมดา */}
            {/* ทำให้มีเงา (shadow) และขอบโค้ง (rounded) ที่สวยงามขึ้น */}
            <Card style={{ width: '24rem' }} className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-4 p-md-5">

                    {/* 6. เพิ่มหัวข้อ (Title) */}
                    <h2 className="fw-bold text-center mb-4">Login</h2>

                    {/* 7. ใช้ <Form> หุ้ม และใช้ onSubmit */}
                    <Form onSubmit={handleLogin}>

                        {/* 8. ใช้ <Form.Group> เพื่อจัดกลุ่ม Label และ Input */}
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>

                            <OverlayTrigger
                                placement="right" // ให้แสดงด้านขวา
                                delay={{ show: 250, hide: 400 }} // หน่วงเวลานิดหน่อย
                                overlay={
                                    <Tooltip id="tooltip-username">
                                        พิม "user"
                                    </Tooltip>
                                }
                            >
                                {/* นี่คือช่องกรอกเดิมของคุณ */}
                                <Form.Control
                                    type="text"
                                    placeholder="user"
                                    ref={userRef}
                                    required
                                />
                            </OverlayTrigger>
                        </Form.Group>


                        {/* === ช่อง Password === */}
                        <Form.Group className="mb-4" controlId="password">
                            <Form.Label>Password</Form.Label>

                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip id="tooltip-password">
                                        พิม "pass"
                                    </Tooltip>
                                }
                            >
                                {/* นี่คือช่องกรอกเดิมของคุณ */}
                                <Form.Control
                                    type="password"
                                    placeholder="pass"
                                    ref={passRef}
                                    required
                                />
                            </OverlayTrigger>
                        </Form.Group>

                        {/* 9. ใช้ <Button> ของ React Bootstrap และทำให้เต็มความกว้าง */}
                        <Button variant="primary" type="submit" className="w-100 fw-bold">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;