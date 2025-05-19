import { useContext } from "react"
import { Row } from "react-bootstrap"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import BadgerBudSummary from "../../BadgerBudSummary";
import { useState } from "react";

export default function BadgerBudsAdoptable(props) {
    const buddies = useContext(BadgerBudsDataContext);
    const [hiddenIds, setHiddenIds] = useState(() => {
        return JSON.parse(sessionStorage.getItem("savedCatIds") || "[]");
    })
    const handleSave = (id) => {
        setHiddenIds(prev => [...prev, id])
    }
    const visibleBuddies = buddies.filter(buddy => !hiddenIds.includes(buddy.id))
    return <div>
        <h1>Available Badger Buds</h1>
        {visibleBuddies.length === 0 ? (
            <p>No buds are available for adoption!</p>
        ) : (
            <>
                <p>The following cats are looking for a loving home! Could you help?</p>
                <Row>
                    {buddies.filter(buddy => !hiddenIds.includes(buddy.id)).map(buddy => (
                        <BadgerBudSummary
                            key={buddy.id}
                            id={buddy.id}
                            name={buddy.name}
                            imgIds={buddy.imgIds}
                            gender={buddy.gender}
                            breed={buddy.breed}
                            age={buddy.age}
                            description={buddy.description}
                            onSave={handleSave}
                        />
                    ))}
                </Row>
            </>

        )}


    </div>
}