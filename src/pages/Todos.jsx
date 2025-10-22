import { useEffect, useState } from "react"; 
import { Form, Table, Badge, Button } from "react-bootstrap";
import { fetchTodos } from "../data/todos";

const Todos = () => {
  // todosraw -> [filter] -> [paginate] -> todos
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]); 
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

    
    const startIndex = (curPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    setTodos(filtered.slice(startIndex, endIndex));

  }, [todosRaw, onlyWaiting, curPage, itemsPerPage]);

  return (
    <>
      {/* filter */}
      <div className="d-flex align-items-center justify-content-between mb-3 ">
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Show only waiting" 
          onChange={(e) => {
            setOnlyWaiting(e.target.checked);
            setCurPage(1); 
          }}
        />

        <Form.Select
          aria-label="Items per page"
          className="w-25"
          value={itemsPerPage} // เพิ่ม value_prop เพื่อให้ state ตรงกับ UI
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value)); // แก้ไข: แปลงเป็น Number
            setCurPage(1); // รีเซ็ตหน้าเมื่อเปลี่ยน itemsPerPage
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
              <th className="text-center">title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed
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
                    {todo.completed ? (
                      <Badge bg="success">
                        {" "}
                        done&nbsp;<i className="bi bi-check"></i>{" "}
                      </Badge> 
                    ) : (
                      <Badge bg="warning">
                        waiting&nbsp;<i className="bi bi-clock"></i>
                      </Badge>
                    )}
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
        
        {/* แก้ไข: การแสดงผลเลขหน้า */}
        <span className="fw-bold">{curPage}&nbsp;/&nbsp;{numPage}</span>

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