/* eslint-disable */
import { useState } from "react";
import { Card, Button, Col, Carousel } from "react-bootstrap";
const BadgerBudSummary = (props) => {

    const [showMore, setShowMore] = useState(false);

    const handleSave = () => {
        const saved = JSON.parse(sessionStorage.getItem("savedCatIds") || "[]");
        if (!saved.includes(props.id)) {
            saved.push(props.id);
            sessionStorage.setItem("savedCatIds", JSON.stringify(saved));
            alert(`${props.name} has beed added to your basket!`);
            if (props.onSave) {
                props.onSave(props.id);
            }
        }
        console.log("Saving:", props.id, props.name);
    }


    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ margin: "0.5rem" }} className="h-100">

                <Card.Body >
                    <h3>{props.name}</h3>
                    {showMore ? (
                        <>
                            <Carousel interval={null}>
                                {props.imgIds.map((imgId, index) => (
                                    <Carousel.Item key={index}>
                                        <Card.Img
                                            className="d-block w-100"
                                            src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${imgId}`}
                                            alt={`A picture of ${props.name}-${index + 1}`}
                                            style={{ objectFit: "cover", height: "300px" }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <p>{props.gender}</p>
                            <p>{props.breed}</p>
                            <p>{props.age}</p>
                            {props.description && (
                                <p>{props.description}</p>
                            )}
                        </>
                    ) : (
                        <Card.Img
                            variant="top"
                            src={`https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/${props.imgIds[0]}`}
                            alt={`A picture of ${props.name}`}
                        />
                    )}

                    <Button variant="primary" className="me-2 px-4 py-2" style={{marginTop:"1rem"}} onClick={() => { setShowMore(!showMore) }}>{showMore ? "Show Less" : "Show More"}</Button>
                    <Button variant="secondary" className="px-4 py-2" style={{marginTop:"1rem"}} onClick={handleSave}>❤️ Save</Button>
                </Card.Body>

            </Card>
        </Col>
    )

}

export default BadgerBudSummary;