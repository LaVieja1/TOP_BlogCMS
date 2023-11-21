import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const theNav = ({ userAuth, setUserAuth }) => {
    const logout = () => {
        setUserAuth(false);
        localStorage.clear();
    };

    return (
        <Navbar>
            <Navbar.Brand>
                {" "}
                <h1>Blog CMS Admin</h1>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <LinkContainer to="/posts">
                    <Nav.Link>Inicio</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/newpost">
                    <Nav.Link>Nuevo Post</Nav.Link>
                </LinkContainer>
            </Nav>
            {userAuth && (
                <Button variant="outline-success" onClick={logout}>
                    Cerrar Sesion
                </Button>
            )}
        </Navbar>
    );
};

export default theNav;