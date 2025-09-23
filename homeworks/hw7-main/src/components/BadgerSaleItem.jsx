import { useState } from "react";
import { Text, View, Image,Button } from "react-native";
import { StyledButton } from "./StyleButton";
export default function BadgerSaleItem(props) {


    return <View style={{ alignItems: 'center' ,marginTop:20}}>
        <Image style={{ height: 200, width: 200 }} source={{ uri: props.imgSrc }}></Image>
        <Text style={{
            fontWeight: 'bold',
            fontSize:"24"
        }}>{props.name}</Text>
        <Text style={{
            textAlign: 'center'
        }}>${props.price} each</Text>
        <Text style={{
            textAlign: 'center'
        }}>You can order up to {props.upperLimit} units!</Text>

        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center',marginVertical:12 }}>
            <StyledButton
                title="-"
                onPress={props.decrement}
                disabled={props.quantity === 0}
            />
            <Text style={{ marginHorizontal: 10 }}>{props.quantity}</Text>
            <StyledButton
                title="+"
                onPress={props.increment}
                disabled={props.quantity === props.upperLimit}
            />
        </View>
    </View>
}
