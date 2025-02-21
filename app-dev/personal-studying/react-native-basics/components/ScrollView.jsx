import { View, Text, StyleSheet, ScrollView } from "react-native";

function ScrollViewComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Scroll View Component</Text>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                bounces={true}
            >
                {...Array(20).map((_, index) => {})}
            </ScrollView>
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
    scrollView: {
        height: 200,
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "#f0f0f0",
    },
    scrollViewContent: {
        padding: 20,
    },
});

export default ScrollViewComponent;
