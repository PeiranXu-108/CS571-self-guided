import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerRegisterScreen(props) {
    // 本地状态：用于存储输入的用户名和密码
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    // 处理注册按钮点击逻辑
    const handleSignup = async () => {
        // 前端验证
        if (!pin || !confirmPin) {
            Alert.alert("错误", "请输入PIN码");
            return;
        }
        if (pin.length !== 7) {
            Alert.alert("错误", "PIN码必须是7位数字");
            return;
        }
        if (pin !== confirmPin) {
            Alert.alert("错误", "两次输入的PIN码不一致");
            return;
        }

        // 发起POST请求注册
        try {
            const res = await fetch("https://cs571.org/rest/s25/hw9/register", {
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
                // 将JWT保存在本地
                await SecureStore.setItemAsync("jwt", data.token);
                await SecureStore.setItemAsync("username", username);
                // 注册成功，进入主界面
                props.handleSignup(username, pin);
            }else if (res.status === 409) {
                Alert.alert("注册失败", "用户名已被占用");
            } else {
                Alert.alert("注册失败", "请检查输入或稍后再试");
            }
        } catch (e) {
            Alert.alert("网络错误", "请检查网络连接");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36, marginBottom: 20 }}>Join BadgerChat!</Text>

            <TextInput
                style={styles.input}
                placeholder="用户名"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="PIN码（7位数字）"
                value={pin}
                onChangeText={setPin}
                keyboardType="number-pad"
                secureTextEntry={true}
                maxLength={7}
            />

            <TextInput
                style={styles.input}
                placeholder="确认PIN码"
                value={confirmPin}
                onChangeText={setConfirmPin}
                keyboardType="number-pad"
                secureTextEntry={true}
                maxLength={7}
            />

            <View style={styles.buttonContainer}>
                <Button color="crimson" title="注册" onPress={handleSignup} />
            </View>
            <View style={styles.buttonContainer}>
                <Button color="grey" title="返回登录" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;
