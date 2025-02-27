import { View, Text, StyleSheet, Button } from "react-native";
import Navbar from "../components/Navbar";

const AboutScreen = () => {
    return (
        <View>
            <Navbar />
            <View style={styles.contentContainer}>
                <Text>About Screen</Text>
                <Text>This is the about screen.</Text>
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

export default AboutScreen;
