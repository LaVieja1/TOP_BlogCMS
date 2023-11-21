import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditPost = () => {
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [successMsg, setSuccessMsg] = useState(false);

    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();
    let { id } = useParams();

    useEffect(() => {
        const getPosts = async () => {
            try {
                const req = await fetch(
                    `https://top-blogapi.onrender.com/api/posts/${id}`
                );
                if (req.status !== 200) {
                    return;
                }
                const reqJson = await req.json();
                setPost(reqJson.post);
            } catch (err) {}
        };
        getPosts();

        const getComments = async () => {
            try {
                const req = await fetch(
                    `https://top-blogapi.onrender.com/api/posts/${id}/comments`
                );
                if (req.status !== 200) {
                    return;
                }
                const reqJson = await req.json();
                setComments(reqJson.comments);
            } catch (err) {}
        };
        getComments();
        setSuccessMsg(false);
    }, []);

    const submitForm = async (data) => {
        const token = localStorage.getItem("token");
        const bearer = `Bearer ${token}`;
        const formData = JSON.stringify(data);
        try {
            const req = await fetch(
                `https://top-blogapi.onrender.com/api/posts/${id}`,
                {
                    method: "PUT",
                    body: formData,
                    headers: {
                      Authorization: bearer,
                      "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
            setSuccessMsg(true);
        } catch (err) {}
    };

    const deletePost = async () => {
        const token = localStorage.getItem("token");
        const bearer = `Bearer ${token}`;
        try {
            const req = await fetch(
                `https://top-blogapi.onrender.com/api/posts/${id}`,
                {
                    method: "DELETE",
                    headers: {
                      Authorization: bearer,
                      "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
            await deleteAllComments();
            history.push("/posts");
        } catch (err) {
            console.error(err);
        }
    };

    const deleteComment = async (commentId) => {
        const token = localStorage.getItem("token");
        const bearer = `Bearer ${token}`;
        try {
            const req = await fetch(
                `https://top-blogapi.onrender.com/api/posts/${id}/comments/${commentId}`,
                {
                    method: "DELETE",
                    headers: {
                      Authorization: bearer,
                      "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
            const newComments = comments.filter(
                (comment) => comment._id !== commentId
            );
            setComments(newComments);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteAllComments = async () => {
        const token = localStorage.getItem("token");
        const bearer = `Bearer ${token}`;
        try {
            const req = await fetch(
                `https://top-blogapi.onrender.com/api/posts/${id}/comments`,
                {
                    method: "DELETE",
                    headers: {
                      Authorization: bearer,
                      "Content-Type": "application/json",
                    },
                }
            );
            if (req.status !== 200) {
                return;
            }
            const newComments = {};
            setComments(newComments);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="layout">
            {post ? (
                <div>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="title">Titulo:</Form.Label>
                            <Form.Control
                                ref={register({ required: "campo requerido" })}
                                name="title"
                                defaultValue={post.title}
                            ></Form.Control>
                            {errors.title && <Form.Text>Campo requerido</Form.Text>}
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label htmlFor="text">Post:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="text"
                                ref={register({ required: "campo requerido" })}
                                defaultValue={post.text}
                            ></Form.Control>
                            {errors.text && <Form.Text>Campo requerido</Form.Text>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="author_name">Autor:</Form.Label>
                            <Form.Control
                                name="author_name"
                                ref={register({ required: "campo requerido" })}
                                defaultValue={post.author_name}
                            ></Form.Control>
                            {errors.author_name && <Form.Text>Campo requerido</Form.Text>}
                        </Form.Group>
                        {successMsg && <Form.Text>Editado exitosamente!</Form.Text>}

                        <Form.Group>
                            {" "}
                            <Button
                                type="submit"
                                onClick={((e) => e.preventDefault(), handleSubmit(submitForm))}
                            >
                                Editar
                            </Button>
                            <Button
                                style={{ margin: "20px" }}
                                variant="danger"
                                onClick={deletePost}
                            >
                                Eliminar post
                            </Button>
                        </Form.Group>
                    </Form> 
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            {comments && <p>Comentarios</p>}
            {comments &&
                comments.map((comment) => {
                    return (
                        <div key={comment._id}>
                            <p>{comment.text}</p>
                            <Button
                                variant="danger"
                                onClick={() => deleteComment(comment._id)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    );
                })}
        </div>
    );
};

export default EditPost;