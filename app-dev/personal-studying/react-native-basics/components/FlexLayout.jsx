import { View, Text, StyleSheet } from "react-native";

function FlexLayout() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Layout using Flex</Text>

            <Text>Main Axis (Row)</Text>
            <View style={styles.rowContainer}>
                <View style={[styles.box, styles.redBox]}></View>
                <View style={[styles.box, styles.blueBox]}></View>
                <View style={[styles.box, styles.greenBox]}></View>
            </View>

            <Text>Cross Axis (Column)</Text>
            <View style={styles.columnContainer}>
                <View style={[styles.box, styles.redBox]}></View>
                <View style={[styles.box, styles.blueBox]}></View>
                <View style={[styles.box, styles.greenBox]}></View>
            </View>
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
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    box: {
        width: 50,
        height: 50,
    },
    redBox: {
        backgroundColor: "red",
    },
    blueBox: {
        backgroundColor: "blue",
    },
    greenBox: {
        backgroundColor: "green",
    },
    columnContainer: {
        // column view is the default
        // flexDirection: "column",
        height: 200,
        justifyContent: "space-between",
        marginBottom: 20,
    },
});

export default FlexLayout;
