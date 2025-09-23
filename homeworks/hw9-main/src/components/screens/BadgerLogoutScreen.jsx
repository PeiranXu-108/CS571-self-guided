import {useContext} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import userContext from '../../contexts/userContext';

export default function BadgerLogoutScreen(props) {
    const { setIsLoggedIn, setIsGuest, setUsername } = useContext(userContext);

    const handleLogout = async () => {

        // 清除本地缓存
        await SecureStore.deleteItemAsync("jwt");
        await SecureStore.deleteItemAsync("username");

        setChatrooms([]);
        setIsGuest(false);
        if (isGuest) {
            setIsRegistering(true);
        } else {
           setIsLoggedIn(false)
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>你确定吗？</Text>
            <Text style={styles.subtitle}>欢迎回来</Text>
            <View style={styles.buttonWrapper}>
                <Button title="退出登录" onPress={handleLogout} color="#8B0000" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20
    },
    buttonWrapper: {
        padding: 10,
        backgroundColor: '#f8d7da',
        borderRadius: 5
    }
});