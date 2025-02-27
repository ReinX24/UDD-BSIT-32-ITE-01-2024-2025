import { View, Text, StyleSheet, Button } from "react-native";
import Navbar from "../components/Navbar";

const ProfileScreen = () => {
    return (
        <View>
            <Navbar />
            <View style={styles.contentContainer}>
                <Text>Profile Screen</Text>
                <Text>This is the profile screen.</Text>
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

export default ProfileScreen;
