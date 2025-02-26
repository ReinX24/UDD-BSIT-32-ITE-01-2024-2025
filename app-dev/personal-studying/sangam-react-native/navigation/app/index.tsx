import { View, Text, StyleSheet } from "react-native";
import React from "react";

function index(): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>React Native Navigation</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerText: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default index;
