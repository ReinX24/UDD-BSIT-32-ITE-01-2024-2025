import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function TextInputComponent() {
    const [value, setValue] = useState("");

    console.log(value);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Text Input Component</Text>
            <TextInput
                placeholder="Type something here..."
                value={value}
                style={styles.input}
                onChangeText={setValue}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    headerText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
        textDecorationLine: "underline",
    },
    input: {
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default TextInputComponent;
