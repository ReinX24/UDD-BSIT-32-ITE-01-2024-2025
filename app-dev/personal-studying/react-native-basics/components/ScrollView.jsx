import { View, Text } from "react-native";

function ScrollViewComponent() {
    return (
        <View style={styles.container}>
            <Text>Scroll View Component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
});

export default ScrollViewComponent;
