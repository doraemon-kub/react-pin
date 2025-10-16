import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <div className="d-flex justify-content-center gap-3">
      <Link to={'home'} >
        <Button variant="outline-primary">HOME</Button>
      </Link>
      <Link to={'calculator'} >
        <Button variant="outline-warning">CALCULATE</Button>
      </Link>
      <Link to={'animation'} >
        <Button variant="outline-danger">ANIMATION</Button>
      </Link>
      <Link to={'components'} >
        <Button variant="outline-light">COMPONENTS</Button>
      </Link>
    </div>

  );
}

export default AppNavbar;