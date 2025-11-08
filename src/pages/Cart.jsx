import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { } from 'react-bootstrap';

import { useOutletContext } from "react-router-dom";

const Cart = () => {
    const { carts, setCartItems } = useOutletContext();

    return (
        <>
            {/* ⭐️ 1. เพิ่ม div นี้เข้าไปครอบ (ตัวจัดกลาง) */}
            <div style={{
                display: 'flex',
                justifyContent: 'center', // สั่งให้ div ลูก (grid) ไปอยู่ตรงกลาง
                padding: '20px 0' // เพิ่มระยะห่างบนล่าง
            }}>

                {/* ⭐️ 2. นี่คือ div grid เดิมของคุณ ที่มีการแก้ไขเล็กน้อย */}
                <div style={{
                    display: 'grid',
                    // ⭐️ 3. แก้จาก 1fr เป็น auto
                    gridTemplateColumns: 'repeat(4, auto)', // ให้คอลัมน์กว้างตาม content (18rem)
                    gap: '20px',
                    alignItems: 'start', // จัดการ์ดให้เริ่มจากด้านบน
                    maxHeight: '75vh', // ⭐️ เปลี่ยนจาก height (780px) เป็น maxHeight
                    overflowY: 'auto',
                    padding: '0 20px' // เอา padding บนล่างออก (ไปอยู่ที่ตัวครอบนอกแล้ว)
                }}>

                    {carts.map((cart) => {
                        return (
                            <Card style={{ width: '18rem' }} key={cart.id}>
                                <Card.Img variant="top" src={cart.thumbnailUrl} />
                                <Card.Body>
                                    <Card.Title>{cart.title}</Card.Title>
                                    <Card.Text>
                                        <b>${cart.price.toFixed(2)}</b>
                                    </Card.Text>
                                    <Button variant="outline-danger"
                                        onClick={() => {
                                            setCartItems(carts.filter((c) => c.id !== cart.id))
                                        }}>
                                        Remove from Carts
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div> {/* </div> ปิด grid */}
            </div> {/* </div> ปิด flex (ตัวจัดกลาง) */}


            {/* ⭐️ คำแนะนำเล็กน้อย ⭐️ */}
            {/* 1. ใน React ควรใช้ `className` (ตัว N ใหญ่) แทน `class`
              2. ใน .reduce() ควรเปลี่ยนชื่อตัวแปร `carts` เป็น `cartItem` จะได้ไม่สับสนครับ
            */}
            <h4 style={{ textAlign: 'center' }}>
                Item: <span className="badge text-bg-danger">{carts.length} Item</span>
                &nbsp;- Total Price: <span className="badge text-bg-success">
                    ${carts.reduce((prev, cartItem) => {
                        return prev + cartItem.price
                    }, 0).toFixed(2)}
                </span>
            </h4>

            <div className="d-flex justify-content-center">
                <Button variant="warning" >Checkout &nbsp;&nbsp; <i className="bi bi-credit-card"></i></Button>
            </div>
        </>);
}

export default Cart;