import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <div className="d-flex justify-content-center gap-3 my-3 bg-dark">
      <Link to={'home'} >
        <Button variant="outline-primary" className="fs-3 fw-bold p-3 m-3">HOME</Button>
      </Link>
      <Link to={'calculator'} >
        <Button variant="outline-warning" className="fs-3 fw-bold p-3 m-3">CALCULATE</Button>
      </Link>
      <Link to={'animation'} >
        <Button variant="outline-danger" className="fs-3 fw-bold p-3 m-3">ANIMATION</Button>
      </Link>
      <Link to={'components'} >
        <Button variant="outline-info" className="fs-3 fw-bold p-3 m-3">COMPONENTS</Button>
      </Link>
      <Link to={'Todos'} >
        <Button variant="outline-info" className="fs-3 fw-bold p-3 m-3">TODOS</Button>
      </Link>
      
    </div>

  );
}

export default AppNavbar;