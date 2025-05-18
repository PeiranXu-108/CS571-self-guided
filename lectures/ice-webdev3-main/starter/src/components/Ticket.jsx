/* eslint-disable */
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import TicketContext from "../contexts/TicketContext";

const Ticket = (props) => {

    const move = useContext(TicketContext);

    function moveToDo() {
        move(props.status, "todo", props.id);
    }
    function moveInProgress() {
        move(props.status, "inprogress", props.id);
    }
    function moveDone() {
        move(props.status, "done", props.id);
    }
    return <Card style={{ margin: "0.5rem" }}>
        <h2 style={{ fontSize: "1.5rem" }}>{props.name}</h2>
        <sub>{props.author}</sub>
        <br />
        <p>{props.description}</p>
        <Button onClick={moveToDo}>Move to TODO</Button>
        <Button onClick={moveInProgress} variant="secondary">Move to InProgress</Button>
        <Button onClick={moveDone} variant="success">Move to Done</Button>
    </Card>
}

export default Ticket;