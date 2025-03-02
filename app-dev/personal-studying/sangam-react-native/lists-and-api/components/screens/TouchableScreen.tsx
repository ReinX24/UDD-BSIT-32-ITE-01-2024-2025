import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";

const TouchableScreen: React.FC = () => {
    const [count, setCount] = useState(0);

    console.log(count);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Touchable Demo</Text>

            <TouchableOpacity
                onPress={() => {
                    setCount(count + 1);
                }}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Touchable</Text>
                </View>
            </TouchableOpacity>

            <Pressable
                style={({ pressed }) => {
                    return [
                        styles.button,
                        {
                            backgroundColor: pressed ? "#6f6f6f" : "#2f2f2f",
                        },
                    ];
                }}
                onPress={() => {
                    setCount(count + 1);
                }}
            >
                {({ pressed }) => {
                    return (
                        <Text
                            style={[
                                styles.buttonText,
                                { color: pressed ? "#2f2f2f" : "#f2f2f2" },
                            ]}
                        >
                            {pressed ? "Button Pressed" : "Pressable"}
                        </Text>
                    );
                }}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
        padding: 10,
        backgroundColor: "#2f2f2f",
        borderRadius: 5,
        marginBottom: 10,
        minWidth: 250,
        alignItems: "center",
    },
    buttonText: {
        color: "#f2f2f2",
        fontSize: 20,
    },
});

export default TouchableScreen;
