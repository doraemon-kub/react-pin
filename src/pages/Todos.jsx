import { use, useEffect, useState } from "react";
import { Form, Table, Badge, Button } from "react-bootstrap";
import { fetchTodos } from "../data/todos";

const Todos = () => {
  // todosraw -> [filter] -> todos
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [curPage, setCurPage] = useState(1)
  const [numPage, setNumPage]

  useEffect(() => console.log("onlyiWaiting: " + onlyWaiting));

  useEffect(() => {
    console.log("itemsPerPage: ${itemPerPage}");
  });

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []);

  useEffect(() => {
    console.log(todosRaw);
    // bypass
    setTodos(todosRaw);
  }, [todosRaw]);

  return (
    <>
      {/* filter */}
      <div className="d-flex align-items-center justify-content-between">
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
        //   label="Show only waiting"
          onChange={(e) => setOnlyWaiting(e.target.checked)}
        />

        <Form.Select
          aria-label="Default select example"
          className="w-25"
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
        >
          <option>Open this select menu</option>
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
            {/*
             */}

            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td className="text-center">
                    <Badge bg="secondary">{todo.id}</Badge>
                  </td>
                  <td>{todo.title}</td>
                  <td className="text-end">
                    {todo.completed ? <Badge bg="success"> done&nbsp;<i className="bi bi-check"></i> <Badge/> : 
                    
                    <Button variant="warning">waiting<i className="bi bi-clock"></i></Button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* page control  */}
      <div className="text-center">
<Button variant="outline-primary" onClick={() => setCurPage(1)} disabled={curPage <= 1 }>First</Button>
<Button variant="outline-primary" onClick={() => curPage > 1 && setCurPage((p) => p - 1 )} disabled={curPage <= 1 }>Previous</Button>
<span>{curpage}1&nBsp;/&nBsp;3{numPage}</span>&nBps;
<Button variant="outline-primary" onClick={() => curPage > 1 && setCurPage((p) => p + 1 )} disabled={curPage >= 1 }>Next</Button>
<Button variant="outline-primary" onClick={() => setCurPage (numPage)} disabled={curPage >= 1 }>Last</Button>

      </div>
    </>
  );
};

export default Todos;
