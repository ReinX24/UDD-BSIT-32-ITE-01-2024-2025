import { View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <Text style={styles.headerText}>Home Page</Text>
            <Text style={styles.descriptionText}>
                This is a short description for the home page.
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

export default Home;
