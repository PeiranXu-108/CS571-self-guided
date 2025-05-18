/* eslint-disable */
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from './TicketLane'
import TicketContext from "../contexts/TicketContext";

const TicketBoard = (props) => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571.org/rest/s25/ice/tickets', {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        })
            .then(res => res.json())
            .then(ticketData => {
                console.log(ticketData);
                setTicketLanes({
                    todo: ticketData,
                    inprogress: [],
                    done: []
                });
            })
    }, []);

    function move(from, to, id) {
        console.log("Move", from, to, id)
        setTicketLanes(oldLanes => {
            let oldLane = oldLanes[from];
            let toLane = oldLanes[to];
            let tic = oldLane.find(t => t.id === id)

            let newLanes = { ...oldLanes }
            newLanes[to] = [...toLane, tic]
            newLanes[from] = oldLane.filter(t => t.id !== id)

            return newLanes
        })
    }

    return <div>
        <h1>Ticket Board</h1>
        <TicketContext.Provider value={move}>
            <Container fluid>
                {
                    Object.keys(ticketLanes).map(laneName => {
                        return <TicketLane
                            key={laneName}
                            status={laneName}
                            tickets={ticketLanes[laneName]}
                            move={move}
                        />
                    })
                }
            </Container>
        </TicketContext.Provider>

    </div>
}

export default TicketBoard;