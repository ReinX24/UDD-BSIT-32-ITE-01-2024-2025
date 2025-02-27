import { View, Text, StyleSheet, Button } from "react-native";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
    return (
        <View>
            <Navbar />
            <View style={styles.contentContainer}>
                <Text>Home Screen</Text>
                <Text>This is the home screen.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        height: 500,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
