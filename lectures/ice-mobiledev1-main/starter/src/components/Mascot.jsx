import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot-messages
export default function Mascot(props) {
    const [name, setName] = useState("")
    const [slogan, setSlogan] = useState("")
    const [img, setImg] = useState("")

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/ice/mascot", {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setName(data.name)
                setSlogan(data.quote)
                setImg(data.imgSrc)
            })
    }, [])

    function doSpeak() {
        fetch("https://cs571.org/rest/s25/ice/mascot-messages", {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        })
        .then(res => res.json())
        .then(resp => Alert.alert("Message received!", resp.msg))
    }

    return <View>
        {
            name ? <Pressable onPress={doSpeak}>
                <Image style={{width:200, height:200}} source={{url:img}}></Image>
                <Text style={{fontSize:28}}>{name}</Text>
                <Text style={{fontSize: 16}}>{slogan}</Text>
            </Pressable> : <Text>Still loading...</Text>
        }
    </View>
}