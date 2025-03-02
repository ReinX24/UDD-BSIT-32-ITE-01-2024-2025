import { View, Text, StyleSheet } from "react-native";

const INITIAL_DATA = Array.from({ length: 20 }, (_, index) => {
    return {
        id: index.toString(),
        title: `Item ${index + 1}`,
    };
});

const PullToRefesh = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Large List with pull to refresh and Infinite Scrolling
            </Text>
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

export default PullToRefesh;
