/* eslint-disable */
import { useState } from "react";
import { Card, Button, Col } from "react-bootstrap";
const BadgerBudsAdopt = (props) => {


    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ margin: "0.5rem" }} className="h-100">
                <Card.Img
                    variant="top"
                    src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
                    alt={`A picture of ${props.name}`}
                />
                <Card.Body >
                    <h3>{props.name}</h3>
                    <Button variant="secondary" className="me-2 px-4 py-2" style={{marginTop:"1rem"}} onClick={()=>props.onUnselect(props.id,props.name)} >Unselect</Button>
                    <Button variant="success" className="px-4 py-2" style={{marginTop:"1rem"}} onClick={()=>props.onAdopt(props.id, props.name)}>❤️ Adopt</Button>
                </Card.Body>

            </Card>
        </Col>
    )

}

export default BadgerBudsAdopt;