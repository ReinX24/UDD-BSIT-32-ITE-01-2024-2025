import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

const TouchableScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Touchable Demo</Text>

            <TouchableWithoutFeedback></TouchableWithoutFeedback>
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
});

export default TouchableScreen;
