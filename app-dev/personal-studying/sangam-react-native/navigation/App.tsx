import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Text style={styles.headerText}>React Native Navigation</Text>
                <StatusBar style="auto" />
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
    },
});
