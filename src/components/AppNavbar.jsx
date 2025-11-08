import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const AppNavbar = ({ products, carts }) => {
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
            <Link to={'product'} >
                <Button variant="outline-info" className="fs-3 fw-bold p-3 m-3">PRODUCT ({products.length})</Button>
            </Link>
            <Link to={'cart'} >
                <Button variant="outline-info" className="fs-3 fw-bold p-3 m-3 position-relative" >

                    CART
                    {carts.length > 0 && (
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {carts.length}
                            <span class="visually-hidden">unread messages</span>
                        </span>
                    )}

                </Button>
            </Link>

        </div>

    );
}

export default AppNavbar;