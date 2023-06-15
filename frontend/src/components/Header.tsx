import {
    Container,
    Navbar,
    Button,
    Form,
    Nav,
} from 'react-bootstrap'
import { Link, useLocation } from "react-router-dom"
import { useState } from 'react';

export function Header() {
    const [keyword, setKeyword] = useState("");
    var showName;

    const location = useLocation();
    var locationDomain = '';
    // get domain of location
    if (location.pathname.includes("books_control"))
        locationDomain = '/books_control';
    else if (location.pathname.includes("imgs"))
        locationDomain = '/imgs';
    else if (location.pathname.includes("status"))
        locationDomain = '/status';
    else if (location.pathname.includes("users_control"))
        locationDomain = '/users_control';

    console.log(locationDomain);
    return (
        <header>
            <Navbar expand="lg" bg="dark" className="navbar-dark">
                <Container fluid>
                    <Navbar.Brand>WSM Search Engine</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="me-auto mb-2 mb-lg-0">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/imgs">Home</Nav.Link>
                            </Nav.Item>
                            <Navbar.Text>
                                {showName}
                            </Navbar.Text>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control className="me-2" type="search" placeholder="Search" value={keyword} onChange={(e) => { console.log(e); setKeyword(e.target.value); }} />
                            <Button variant="outline-success" type="submit" as={Link} to={(keyword === "") ? locationDomain + "/search/" : `${locationDomain}/search/${keyword}`}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};