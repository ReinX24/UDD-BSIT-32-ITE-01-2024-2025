import { StyleSheet, View, Text } from "react-native";

function TextInput() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Text Input Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
        textDecorationLine: "underline",
    },
});

export default TextInput;
