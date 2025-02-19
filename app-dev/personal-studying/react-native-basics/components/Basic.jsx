import { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

function Basic() {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            {/* View Component */}
            <View style={styles.boxContainer}>
                <View style={styles.redBox}></View>
                <View style={styles.blueBox}></View>
                <View style={styles.greenBox}></View>
            </View>
            {/* Text component */}
            <Text style={styles.myFirstText}>My First React Native Course</Text>
            <Text style={styles.nestedText}>
                Text components can be nested.
                <Text style={styles.bold}>Nested</Text>
            </Text>

            {/* Image component */}
            <Image
                style={styles.image}
                source={{ uri: "https://picsum.photos/200/300" }}
            ></Image>
            <Image
                style={styles.image}
                source={require("../assets/images/favicon.png")}
            ></Image>

            {/* Button Component */}
            <Button
                color={"red"}
                title="Click Me"
                onPress={() => {
                    setCount(count + 1);
                }}
            />
            <Text>Count is: {count}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    boxContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    redBox: {
        width: 50,
        height: 50,
        backgroundColor: "red",
    },
    blueBox: {
        width: 50,
        height: 50,
        backgroundColor: "blue",
    },
    greenBox: {
        width: 50,
        height: 50,
        backgroundColor: "green",
    },
    myFirstText: {
        fontSize: 30,
    },
    nestedText: {
        fontSize: 18,
    },
    bold: {
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        marginBottom: 10,
    },
});

export default Basic;
