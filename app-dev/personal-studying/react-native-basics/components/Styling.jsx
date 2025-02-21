import { StyleSheet, Text, View } from "react-native";

function StylingDemo() {
    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: "blue",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                }}
            >
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#fff",
                    }}
                >
                    Inline Styling Example
                </Text>
            </View>

            {/* Applying StyleSheet and inline styles */}
            <View
                style={[
                    styles.combinedStyle,
                    {
                        borderWidth: 2,
                        borderColor: "purple",
                    },
                ]}
            >
                <Text
                    style={[
                        styles.combinedText,
                        {
                            textDecorationLine: "underline",
                        },
                    ]}
                >
                    Combined Text Style
                </Text>
                <Text
                    style={[
                        styles.combinedText,
                        {
                            textDecorationLine: "underline",
                            color: "red",
                            fontWeight: "bold",
                        },
                    ]}
                >
                    Combined Text Style With different color
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    combinedStyle: {
        backgroundColor: "lightyellow",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    combinedText: {
        fontSize: 14,
    },
});

export default StylingDemo;
