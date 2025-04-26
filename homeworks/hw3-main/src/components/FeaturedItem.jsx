/* eslint-disable*/
import { Button, Table, Card } from "react-bootstrap";
import { useState } from "react";

export default function FeaturedItem(props) {

    const [showNutrition, setShowNutrition] = useState(false);
    function handleClick() {
        setShowNutrition(prev => !prev);
    }
    return (
      <Card style={{ margin: "auto", marginTop: "1rem", maxWidth: "40rem" }}>
        <Card.Body>
          <Card.Img variant="top" src={props.img} alt={props.description} />
          <Card.Title style={{ marginTop: "1rem", fontWeight: "bold" }}>{props.name}</Card.Title>
          <Card.Text><strong>Price:</strong> {props.price} per unit</Card.Text>
          <Card.Text>{props.description}</Card.Text>
          <Button variant="primary" onClick={handleClick} style={{ marginBottom: "1rem" }}>
            {showNutrition ? "Hide Nutrition Facts" : "Show Nutrition Facts"}
          </Button>
          {showNutrition && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Calories</th>
                  <th>Fat</th>
                  <th>Carbohydrates</th>
                  <th>Protein</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{props.nutrition?.calories ?? "0"}</td>
                  <td>{props.nutrition?.fat ?? "0g"}</td>
                  <td>{props.nutrition?.carbohydrates ?? "0g"}</td>
                  <td>{props.nutrition?.protein ?? "0g"}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    );
}