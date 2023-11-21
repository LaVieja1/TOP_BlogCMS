import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import LoginForm from "./pages/LoginPage";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import EditPost from "./pages/EditPost";
import NewPost from "./pages/NewPost";
import Nav from "./components/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Routes() {
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
                        <Switch>
                            {" "}
                            <Route exact path="/">
                                <Redirect to="/posts" />
                            </Route>
                            <Route exact path="/posts">
                                {!userAuth ? <LoginPage setUserAuth={setUserAuth} /> : <Home />}
                            </Route>
                            <Route exact path="/posts/:id">
                                {!userAuth ? (
                                    <LoginForm setUserAuth={setUserAuth} />
                                ) : (
                                    <EditPost />
                                )}
                            </Route>
                            <Route path="/newpost">
                                {!userAuth ? (
                                    <LoginForm setUserAuth={setUserAuth} />
                                ) : (
                                    <NewPost />
                                )}
                            </Route>
                            <Route path="/">
                                <p>404</p>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Routes;