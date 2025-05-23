
import React, { useRef, useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
export default function BadgerLogin() {

    const usernameRef = useRef();
    const pinRef = useRef();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate();

    // TODO Create the login component.
    const handleLogin = async (e) => {
        e?.preventDefault();

        if(!usernameRef || !pinRef){
            alert("You must provide both a username and pin!")
            return
        }

        const pinRegex = /^\d{7}$/;
        if (!pinRegex.test(pinRef.current.value)) {
            alert("Your pin is a 7-digit number!");
            return
        }

        const res = await fetch("https://cs571.org/rest/s25/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                pin: pinRef.current.value
            })
        })

        if (res.status === 401) {
            alert("Incorrect username or pin!")
        } else if (res.status === 200) {
            const username = usernameRef.current.value
            alert("Logged in Successfully!")
            setLoginStatus({username})
            navigate("/")
        }

    }
    return <>
        <h1>Login</h1>
        {
            <Form onSubmit={handleLogin}>
                <Form.Label htmlFor="usernameInput">Username</Form.Label>
                <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
                <Form.Label htmlFor="passwordInput">Pin</Form.Label>
                <Form.Control id="passwordInput" type="password" ref={pinRef}></Form.Control>
                <br />
                <Button type="submit">Login</Button>
            </Form>
        }
    </>
}
