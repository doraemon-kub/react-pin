import { useEffect, useRef, useState } from "react";
import { Form, Table, Badge, Button } from "react-bootstrap";
import { fetchTodos } from "../data/todos";
import Modal from 'react-bootstrap/Modal';

const Todos = () => {

    const newIdRef = useRef()
    const newTitleRef = useRef()





    // todosraw -> [filter] -> [paginate] -> todos
    const [todosRaw, setTodosRaw] = useState([]);
    const [todos, setTodos] = useState([]);
    const [onlyWaiting, setOnlyWaiting] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10); // เปลี่ยนค่าเริ่มต้นเป็น 10 ตามรูป

    const [curPage, setCurPage] = useState(1);
    const [numPage, setNumPage] = useState(1);

    useEffect(() => console.log("onlyWaiting: " + onlyWaiting), [onlyWaiting]);
    useEffect(() => console.log(`itemsPerPage: ${itemsPerPage}`), [itemsPerPage]);

    useEffect(() => {
        setTodosRaw(fetchTodos());
    }, []);

    useEffect(() => {
        // 1. Filter
        const filtered = onlyWaiting
            ? todosRaw.filter((todo) => !todo.completed)
            : todosRaw;

        const perPage = Number(itemsPerPage);
        const totalPages = Math.ceil(filtered.length / perPage);
        setNumPage(totalPages > 0 ? totalPages : 1);

        // แก้ไข: ตรวจสอบว่าหน้าปัจจุบันยังอยู่ในขอบเขตหรือไม่
        const newCurPage = Math.min(curPage, totalPages > 0 ? totalPages : 1);
        if (curPage !== newCurPage) {
            setCurPage(newCurPage);
            return; // รอ state update ในรอบถัดไป
        }

        const startIndex = (newCurPage - 1) * perPage;
        const endIndex = startIndex + perPage;

        setTodos(filtered.slice(startIndex, endIndex));
    }, [todosRaw, onlyWaiting, curPage, itemsPerPage]);

    const waitingClicked = (id) => {
        console.log(id);

        const selectedTodo = todosRaw.find((todo) => {
            return todo.id === id;
        });

        selectedTodo.completed = true;

        setTodosRaw([...todosRaw]);
    };

    const deleteClicked = (id) => {
        // แก้ไข: ควร filter จาก todosRaw
        const remainTodos = todosRaw.filter((todo) => {
            return todo.id !== id;
        });

        setTodosRaw(remainTodos);
    };

    // handle modal 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClicked = (id, title) => {


        console.log(id, title);
        if (title.trim() !== "") {
            const newTodo =


                setTodosRaw([...todosRaw, {
                    id: Number(id),
                    title: title,
                    completed: false

                }]
                );
        }
        newIdRef.current.value = "";
        newTitleRef.current.value = "";

        handleClose();
    }


    return (
        <>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add todo</Modal.Title>
                </Modal.Header>



                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                value={todosRaw.length + 1}
                                autoFocus
                                disabled={true}
                                ref={newIdRef}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control

                                placeholder="new todo, here!"
                                autoFocus
                                ref={newTitleRef}
                            />

                        </Form.Group>


                    </Form>
                </Modal.Body>



                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveClicked(Number(newIdRef.current.value), newTitleRef.current.value)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>





            {/* filter */}
            <div className="d-flex align-items-center justify-content-between mb-3 ">
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={
                        <>
                            Show only{" "}
                            <Badge bg="warning" text="dark">
                                waiting&nbsp;<i className="bi bi-clock"></i>
                            </Badge>
                        </>
                    }
                    checked={onlyWaiting} // เพิ่ม checked prop
                    onChange={(e) => {
                        setOnlyWaiting(e.target.checked);
                        setCurPage(1);
                    }}
                />

                <Form.Select
                    aria-label="Items per page"
                    className="w-25"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurPage(1);
                    }}
                >
                    <option value={5}>5 item per page</option>
                    <option value={10}>10 item per page</option>
                    <option value={50}>50 item per page</option>
                    <option value={100}>100 item per page</option>
                </Form.Select>
            </div>

            {/* <table></table> */}
            <div>
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center" style={{ width: "4rem" }}>
                                ID
                            </th>
                            <th className="text-center">Title</th> {/* แก้ไข: Title (T ตัวใหญ่) */}
                            <th className="text-end" style={{ width: "12rem" }}>
                                Completed&nbsp;
                                <Button onClick={() => handleShow()}>
                                    <i className='bi bi-plus'></i>
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {todos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td className="text-center">
                                        <Badge bg="secondary">{todo.id}</Badge>
                                    </td>
                                    <td>{todo.title}</td>
                                    <td className="text-end">
                                        {/* ใช้ d-flex เพื่อจัดปุ่มให้อยู่ในแถวเดียว */}
                                        <div className="d-flex justify-content-end align-items-center gap-2">
                                            {/* 1. ปุ่ม Status (Waiting/Done) */}
                                            {todo.completed ? (
                                                <Badge bg="success">
                                                    done&nbsp;<i className="bi bi-check"></i>
                                                </Badge>
                                            ) : (
                                                <Button
                                                    variant="warning" // แก้จาก bg เป็น variant
                                                    size="sm"
                                                    onClick={() => waitingClicked(todo.id)} // เพิ่ม onClick
                                                >
                                                    waiting&nbsp;<i className="bi bi-clock"></i>
                                                </Button>
                                            )}

                                            {/* 2. ปุ่ม Delete (ถังขยะ) */}
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => deleteClicked(todo.id)} // เพิ่ม onClick
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>

            {/* page control */}
            <div className="d-flex justify-content-center align-items-center gap-2">
                <Button
                    variant="outline-primary"
                    onClick={() => setCurPage(1)}
                    disabled={curPage <= 1}
                >
                    First
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
                    disabled={curPage <= 1}
                >
                    Previous
                </Button>

                <span className="fw-bold">
                    {curPage}&nbsp;/&nbsp;{numPage}
                </span>

                <Button
                    variant="outline-primary"
                    onClick={() => curPage < numPage && setCurPage((p) => p + 1)}
                    disabled={curPage >= numPage}
                >
                    Next
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => setCurPage(numPage)}
                    disabled={curPage >= numPage}
                >
                    Last
                </Button>
            </div>
        </>
    );
};

export default Todos;