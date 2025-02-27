import { View, Text, StyleSheet, Button } from "react-native";
import Navbar from "../components/Navbar";

const ContactScreen = () => {
    return (
        <View>
            <Navbar />
            <View style={styles.contentContainer}>
                <Text>Contact Screen</Text>
                <Text>This is the contact screen.</Text>
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

export default ContactScreen;
