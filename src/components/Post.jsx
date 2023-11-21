import React from "react";
import { useMatch, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Post = ({ post }) => {
    let match = useMatch();
    return (
        <Card
            style={{
                width: "18rem",
                padding: "30px",
                borderRadius: "20px",
                maxHeight: "410px",
                overflow: "hidden",
                textOverflow: "ellipsis",
            }}
        >
            <Card.Title>{post.title}</Card.Title>
            <Button variant="link">
                <Link to={`${match.url}/${post._id}`}>Editar Post</Link>
            </Button>
            <Card.Body>{post.text}</Card.Body>
        </Card>
    );
};

export default Post;