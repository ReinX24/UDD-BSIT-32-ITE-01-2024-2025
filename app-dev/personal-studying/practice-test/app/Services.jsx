import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";

const Services = () => {
    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text style={styles.headerText}>Services Page</Text>
            <Text style={styles.descriptionText}>
                This is a short description for the services page.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    descriptionText: {
        fontSize: 18,
    },
});

export default Services;
