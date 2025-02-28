import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <Button
                title="Home"
                onPress={() => {
                    navigator.navigate("Home");
                }}
            ></Button>
            <Button
                title="Contact"
                onPress={() => {
                    navigator.navigate("Contact");
                }}
            ></Button>
            <Button
                title="About"
                onPress={() => {
                    navigator.navigate("About");
                }}
            ></Button>
            <Button
                title="Services"
                onPress={() => {
                    navigator.navigate("Services");
                }}
            ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 8,
    },
});

export default Navbar;
