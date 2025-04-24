/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { use } from "react";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";


export default function Recipe(props) {

    const [likes, setlikes] = useState(0);

    function handlelike() {
        setlikes(old => old + 1);
    }

    return <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "40rem" }}>
        {
            Object.keys(props).length > 0 ? <>
                <img src={props.img.location} alt={props.img.description} />
                <h2>{props.name}</h2>
                <p>by {props.author} | <strong>{likes} likes</strong></p>
                <p>described as {props.keywords.join(", ")}</p>
                <Button onClick={handlelike}>Like this Recipe</Button>
            </> : <p>Loading...</p>
        }

    </Card>
}