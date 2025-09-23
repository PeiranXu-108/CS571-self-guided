import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerLoginScreen(props) {
    // 状态：记录用户输入
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");

    const handleLogin = async () => {
        if (!username || !pin) {
            Alert.alert("错误", "请输入用户名和PIN码！");
            return;
        }

        try {
            const res = await fetch("https://cs571.org/rest/s25/hw9/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
                },
                body: JSON.stringify({
                    username: username,
                    pin: pin
                })
            });

            if (res.status === 200) {
                const data = await res.json();
                // 保存JWT到本地安全存储
                await SecureStore.setItemAsync("jwt", data.token);
                await SecureStore.setItemAsync("username", username);
                // 通知App：用户已登录
                props.handleLogin(username, pin);
            } else {
                Alert.alert("登录失败", "用户名或PIN码不正确！")
            }
        } catch (e) {
            Alert.alert("网络错误", "无法连接到服务器！");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36, marginBottom: 20 }}>登录</Text>

            <TextInput
                style={styles.input}
                placeholder="用户名"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="PIN码（7位）"
                value={pin}
                onChangeText={setPin}
                keyboardType="number-pad"
                secureTextEntry={true}
                maxLength={7}
            />

            <View style={styles.buttonContainer}>
                <Button color="crimson" title="登录" onPress={handleLogin} />
            </View>
            <View style={styles.buttonContainer}>
                <Button color="grey" title="注册账号" onPress={() => props.setIsRegistering(true)} />
            </View>
            <View>
                <Button
                    title="游客模式"
                    color="darkorange"
                    onPress={() => {
                        props.setIsGuest(true);
                        props.setIsLoggedIn(true);
                    }}
                />
            </View>
        </View>
    );
}

// 样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    buttonContainer: {
        marginVertical: 5,
        width: '100%'
    }
});

export default BadgerLoginScreen;
