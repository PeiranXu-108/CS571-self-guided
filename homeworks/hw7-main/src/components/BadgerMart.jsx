import { Text, View, Button, Alert } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";
import { StyledButton } from "./StyleButton";
import { useEffect, useState } from "react";

import CS571 from '@cs571/mobile-client'

export default function BadgerMart(props) {
    const [items, setItems] = useState([])
    const [current, setCurrent] = useState(0)
    const [basket, setBasket] = useState({})

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw7/items", {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        }).then(res => res.json())
            .then(data => {
                setItems(data);
                setCurrent(0);
                const initBasket = {};
                data.forEach(item => initBasket[item.name] = 0);
                setBasket(initBasket);
            })
    }, [])

    const goPrevious = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    }

    const goNext = () => {
        if (current < items.length - 1) {
            setCurrent(current + 1);
        }
    }

    const increment = (itemName) => {
        setBasket(prev => ({
            ...prev,
            [itemName]: prev[itemName] + 1
        }));
    };

    const decrement = (itemName) => {
        setBasket(prev => ({
            ...prev,
            [itemName]: Math.max(prev[itemName] - 1, 0)
        }));
    };

    const totalCost = items.reduce((total, item)=> total+(basket[item.name]||0)*item.price,0).toFixed(2)
    const totalItems = Object.values(basket).reduce((sum, quantity)=>sum+quantity,0)
    const handleOrder = () =>{
        Alert.alert("Order Confirmed!",`Your order contains ${totalItems} and would have cost \$${totalCost}!`)
        const clearBasket = {}
        items.forEach(item=>clearBasket[item.name] = 0)
        setBasket(clearBasket)
        setCurrent(0)
    }
    return <View style={{alignItems:'center'}}>

        <Text style={{ fontSize: 28 }}>Welcome to Badger Mart!</Text>
        <View style={{flexDirection:'row', marginVertical:12}}>
            <StyledButton title="Previous" onPress={goPrevious} disabled={current === 0} />
            <StyledButton title="Next" onPress={goNext} disabled={current === items.length - 1} />
        </View>
        {
            items.length > 0 ? (<BadgerSaleItem
                key={items[current].name}
                {...items[current]}
                quantity={basket[items[current].name]}
                increment={() => increment(items[current].name)}
                decrement={() => decrement(items[current].name)}
            />) : (
                <Text>Loading...</Text>
            )

        }

        <Text>You have {totalItems} costing ${totalCost} in your cart!</Text>
        <View style={{marginVertical:12}}>
                <StyledButton title="Place Order" onPress={handleOrder} />
        </View>

    </View>
}