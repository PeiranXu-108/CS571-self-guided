
import React, { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
export default function BadgerLogout() {

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://cs571.org/rest/s25/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            setLoginStatus(null);
            sessionStorage.removeItem("loginStatus");
            navigate("/");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
