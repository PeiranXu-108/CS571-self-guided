import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('')

    const handleRegister = async (e) => {
        e?.preventDefault(); //阻止默认提交

        if (!username || !pin || !confirmPin) {
            alert("You must provide both username and pin!");
            return
        }

        if (pin != confirmPin) {
            alert("Your pins do not match!");
            return
        }

        const pinRegex = /^\d{7}$/;
        if (!pinRegex.test(pin)) {
            alert("Your pin must be a 7-digit number!");
            return
        }

        const res = await fetch("https://cs571.org/rest/s25/hw6/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        })
        if (res.status === 409) {
            alert("That username has already been taken!")
        } else if (res.status === 200) {
            alert("Successfulli registered!")
        }
    }

    return <>
        <h1>Register</h1>
        <Form onSubmit={handleRegister}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" value={username} onChange={(e) => {
                setUsername(e.target.value)
            }}></Form.Control>
            <Form.Label htmlFor="pinInput">Pin</Form.Label>
            <Form.Control id="pinInput" type="password" value={pin} onChange={(e) => {
                setPin(e.target.value)
            }}></Form.Control>
            <Form.Label htmlFor="confirmPinInput">Confirm Pin</Form.Label>
            <Form.Control
                id="confirmPinInput"
                type="password"
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
            />
            <br />
            <Button type="submit" >Register</Button>
        </Form>
    </>
}
