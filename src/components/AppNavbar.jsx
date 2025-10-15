import { Button } from "bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <div className="d-flex justify-content-center gap-2">
      <Link to={"home"}>
        <Button >home</Button>
      </Link>
      <Link to={"calculater"}>
        <Button>Calculater</Button>
      </Link>
      <Link to={"animation"}>
        <Button>Animation</Button>
      </Link>
      <Link to={'components'}>
      <Button>Components</Button>
      </Link>
    </div>
  );
};

export default AppNavbar;
