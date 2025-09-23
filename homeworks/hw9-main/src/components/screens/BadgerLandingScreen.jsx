import { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import * as SecureStore from 'expo-secure-store';
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMessages = useCallback(async () => {
        const token = await SecureStore.getItemAsync("jwt");
        const res = await fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`, {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        });

        if (res.status === 200) {
            const data = await res.json();
            setMessages(data.messages);  // API 返回的数组
        } else {
            setMessages([]);
        }
    }, [props.name]);

    // 首次加载
    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // 下拉刷新触发逻辑
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchMessages().finally(() => setRefreshing(false));
    }, [fetchMessages]);

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BadgerChatMessage
                        title={item.title}
                        author={item.author}
                        content={item.content}
                        created={item.created}
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <Text style={{ marginTop: 20 }}>暂无消息</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    }
});

export default BadgerChatroomScreen;
