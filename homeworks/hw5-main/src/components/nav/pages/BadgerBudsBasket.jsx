import { useContext } from "react"
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext"
import { useState } from "react"
import { Row } from "react-bootstrap"
import BadgerBudsAdopt from "../../BadgerBudsAdopt"

export default function BadgerBudsBasket(props) {
    const buddies = useContext(BadgerBudsDataContext)
    const [savedIds, setSavedIds] = useState(() => {
        return JSON.parse(sessionStorage.getItem("savedCatIds") || "[]");
    })

    const handleUnselect = (id, name) => {
        const updated = savedIds.filter(savedId => savedId !== id);
        setSavedIds(updated);
        sessionStorage.setItem("savedCatIds", JSON.stringify(updated))
        alert(`${name} has been removed from your basket! `)
    }
    const handleAdopt = (id, name) => {
        const updated = savedIds.filter(savedId => savedId !== id)
        setSavedIds(updated);
        sessionStorage.setItem("adoptedCatIds", JSON.stringify(id))
        alert(`Thank you for adopting ${name}! 💕🐈`)
    }
    const savedBuddies = buddies.filter(buddy => savedIds.includes(buddy.id));
    return <div>
        <h1>Badger Buds Basket</h1>
        {savedBuddies.length === 0 ? (
            <p>You have no buds in your basket! </p>
        ) : (
            <>
                <p>These cute cats could be all yours!</p>

                <Row>
                    {buddies.filter(buddy => savedIds.includes(buddy.id)).map(buddy => (
                        <BadgerBudsAdopt
                            key={buddy.id}
                            id={buddy.id}
                            name={buddy.name}
                            imgIds={buddy.imgIds}
                            onUnselect={handleUnselect}
                            onAdopt={handleAdopt}
                        />
                    ))}
                </Row>
            </>
        )}

    </div>
}