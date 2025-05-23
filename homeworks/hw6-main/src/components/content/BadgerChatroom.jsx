import React, { useContext, useEffect, useRef, useState } from "react"
import { Col, Form, Row, Pagination, Button } from "react-bootstrap"
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1)
    const [loginStatus] = useContext(BadgerLoginStatusContext)
    const titleRef = useRef()
    const contentRef = useRef()

    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    const handlePost = async (e) => {
        e?.preventDefault();

        const title = titleRef.current.value.trim()
        const content = contentRef.current.value.trim()

        if (!title || !content) {
            alert("You must provide both a title and content! ")
            return
        }

        const res = await fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        // console.log(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`)
        if (res.status === 200) {
            alert("Successfully posted!");
            titleRef.current.value = "";
            contentRef.current.value = "";
            loadMessages();
        }
    }

    const handleDelete = async (id) => {
        const res = await fetch(`https://cs571.org/rest/s25/hw6/messages?id=${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        });

        if (res.status === 200) {
            alert("Successfully deleted the post!")
            loadMessages();
        }
    }
    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            loginStatus ? (
                <Form onSubmit={handlePost}>
                    <Form.Group>
                        <Form.Label htmlFor="postTitle">Title</Form.Label>
                        <Form.Control id="postTitle" ref={titleRef} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="postContent">Content</Form.Label>
                        <Form.Control id="postContent" ref={contentRef} as="textarea" rows={3} />
                    </Form.Group>
                    <br />
                    <Button type="submit">Create Post</Button>
                </Form>
            ) : (
                <p>You must be logged in to post!</p>
            )
        }
        <hr />
        {
            messages.length > 0 ?
                <>
                    <Row>
                        {
                            messages.map((msg) => (
                                /* TODO: Complete displaying of messages. */
                                <Col key={`${msg.id}`} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                    <BadgerMessage
                                        title={msg.title}
                                        poster={msg.poster}
                                        content={msg.content}
                                        created={msg.created}
                                        id={msg.id}
                                        loginStatus={loginStatus}
                                        onDelete={handleDelete}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>

        }
        <Pagination className="mt-4">
            {
                [1, 2, 3, 4].map(p => (
                    <Pagination.Item key={p} onClick={() => setPage(p)} active={p === page}>
                        {p}
                    </Pagination.Item>
                ))
            }
        </Pagination>
    </>
}
