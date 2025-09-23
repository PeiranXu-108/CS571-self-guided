import { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet, Button, Modal, TextInput } from "react-native";
import { FAB } from 'react-native-paper'

import * as SecureStore from 'expo-secure-store';
import BadgerChatMessage from "../helper/BadgerChatMessage";
import userContext from "../../contexts/userContext";

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [username, setUsername] = useState("")
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const { isGuest } = useContext(userContext)
    useEffect(() => {
        const loadUser = async () => {
            const name = await SecureStore.getItemAsync("username");
            setUsername(name);
        };
        loadUser();
    }, []);

    const loadMessages = useCallback(async () => {
        const token = await SecureStore.getItemAsync("jwt");
        try {
            const res = await fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`, {
                headers: {
                    "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
                }
            });

            if (res.status === 200) {
                const data = await res.json();
                setMessages(data.messages);  // API 返回的消息数组
            } else {
                setMessages([]);
            }
        } catch (e) {
            console.log("消息加载失败", e);
        }
    }, [props.name]);

    // 初次加载消息
    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

    // 下拉刷新逻辑
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadMessages().finally(() => setRefreshing(false));
    }, [loadMessages]);

    // 提交新消息
    const handlePost = async () => {
        const token = await SecureStore.getItemAsync("jwt");

        try {
            const res = await fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    content: body
                })
            });

            if (res.status === 200) {
                setShowModal(false);
                setTitle("");
                setBody("");
                Alert.alert("成功", "你的消息已发布！");
                loadMessages(); // 重新加载消息
            } else {
                Alert.alert("失败", "发送失败，请重试！");
            }
        } catch (e) {
            Alert.alert("错误", "网络异常");
        }
    };

    const handleDeletePost = async (id) => {
        const token = await SecureStore.getItemAsync("jwt");

        try {
            const res = await fetch(`https://cs571.org/rest/s25/hw9/messages?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
                }
            });

            if (res.status === 200) {
                Alert.alert("已删除", "你的消息已成功删除！");
                loadMessages();
            } else {
                Alert.alert("删除失败", "请稍后再试！");
            }
        } catch (e) {
            Alert.alert("错误", "网络请求异常");
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BadgerChatMessage
                        title={item.title}
                        poster={item.poster}
                        content={item.content}
                        created={item.created}
                        canDelete={username === item.poster}
                        onDelete={() => handleDeletePost(item.id)}
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={<Text style={styles.emptyText}>暂无消息</Text>}
            />
            {/* 创建消息按钮 */}
            {
                !isGuest && (
                    <FAB
                        icon="plus"
                        style={styles.fab}
                        onPress={()=>setShowModal(true)}
                    />
                )
            }
            {/* Modal 弹窗 */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>新建帖子</Text>
                        <TextInput
                            placeholder="标题"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="内容"
                            value={body}
                            onChangeText={setBody}
                            style={[styles.input, { height: 100 }]}
                            multiline
                        />
                        <View style={styles.modalButtons}>
                            <Button title="取消" color="grey" onPress={() => setShowModal(false)} />
                            <Button title="创建" disabled={!title || !body} onPress={handlePost} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingTop: 10
    },
    emptyText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#666'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 16,
        bottom: 16,
        backgroundColor: 'white', 
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default BadgerChatroomScreen;