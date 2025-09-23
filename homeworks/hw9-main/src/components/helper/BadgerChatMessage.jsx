import { Text, StyleSheet, View, Button } from "react-native";
import BadgerCard from "./BadgerCard"

function BadgerChatMessage({ title, poster, content, created, canDelete, onDelete }) {

    const dt = new Date(created);

    return (
        <View style={styles.card}>
            <BadgerCard>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.meta}>by {poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
                <Text style={styles.content}>{content}</Text>
                {
                    canDelete &&
                    <View style={styles.deleteButton}>
                        <Button title="Delete" color="crimson" onPress={onDelete} />
                    </View>
                }
            </BadgerCard>
        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        marginVertical: 6,
        backgroundColor: '#f1f1f1',
        borderRadius: 8
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    meta: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
        fontStyle:'italic'
    },
    content: {
        marginBottom: 8
    },
    deleteButton: {
        alignSelf: 'flex-end'
    }
});

export default BadgerChatMessage;