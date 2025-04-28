/* eslint-disable */
import { useEffect, useState } from "react";
import Recipe from "./Recipe";

import Stopwatch from "../utils/Stopwatch";
import { Card, Container, Row, Col, Pagination } from "react-bootstrap";

Stopwatch.start();

export default function AllRecipes(props) {

    // Is there a better way to do this? We'll explore this today!
    const [recipes, setRecipe] = useState([])
    const [page, setPage] = useState(1)
    const shownRecipes=recipes.slice((page-1)*3, page*3)

    useEffect(() => {

        // Which fetch will complete first? No one knows!
        fetch("https://cs571.org/rest/s25/ice/all-recipes", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setRecipe(data);
            })
    }, []);

    return <div>
        <h1>Welcome to Badger Recipes!</h1>
        <Container>
            <Row>
                {
                    recipes.length > 0 ? shownRecipes.map(r => <Col xs={12} md={4} key={r.name}><Recipe {...r} /></Col>) : <p>Still Loading...</p>
                }
            </Row>
        </Container>
        <Pagination>
            <Pagination.Item active={page === 1} onClick={() => setPage(1)}>1</Pagination.Item>
            <Pagination.Item active={page === 2} onClick={() => setPage(2)}>2</Pagination.Item>
        </Pagination>
    </div>
}