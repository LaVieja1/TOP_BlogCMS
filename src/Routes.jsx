import { Route, HashRouter, Routes, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginPage";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import EditPost from "./pages/EditPost";
import NewPost from "./pages/NewPost";
import Nav from "./components/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function PagesRoutes() {
    const [userAuth, setUserAuth] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("userAuth");
        if (user) {
            setUserAuth(true);
        } else {
            setUserAuth(false);
        }
    }, []);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {" "}
                        <Nav
                            userAuth={userAuth}
                            setUserAuth={setUserAuth}
                            className="Nav"
                        />
                        <Routes>
                            {" "}
                            <Route path="/" element={<Navigate to="/posts" />} />
                            <Route path="/posts" element={!userAuth ? <LoginForm setUserAuth={setUserAuth} /> : <Home />} />
                            <Route path="/posts/:id" element={!userAuth ? (<LoginForm setUserAuth={setUserAuth} /> ) : (<EditPost />)} />
                            <Route path="/newpost" element={!userAuth ? (<LoginForm setUserAuth={setUserAuth} /> ) : (<NewPost />)}/>
                            <Route path="/" element={<p>404</p>} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PagesRoutes;