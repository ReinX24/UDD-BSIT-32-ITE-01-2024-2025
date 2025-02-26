import { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";

function TouchableComponents() {
    const [opacityCount, setOpacityCount] = useState(0);
    const [highlightCount, setHighlightCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Touchable Components</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setOpacityCount(opacityCount + 1);
                    console.log(opacityCount);
                }}
            >
                <Text style={styles.buttonText}>Touchable Opacity</Text>
            </TouchableOpacity>
            <TouchableHighlight
                style={styles.button}
                underlayColor={"red"}
                onPress={() => {
                    setHighlightCount(highlightCount + 1);
                }}
            >
                <Text style={styles.buttonText}>Touchable Highlight</Text>
            </TouchableHighlight>
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
    button: {
        backgroundColor: "#2196f3",
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: "#f2f2f2",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default TouchableComponents;
