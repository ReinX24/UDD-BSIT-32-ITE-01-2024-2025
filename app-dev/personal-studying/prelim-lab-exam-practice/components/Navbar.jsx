import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.navbarContainer}>
            <Button
                title="Home"
                onPress={() => {
                    navigation.navigate("HomeScreen");
                }}
            />
            <Button
                title="About"
                onPress={() => {
                    navigation.navigate("AboutScreen");
                }}
            />
            <Button
                title="Profile"
                onPress={() => {
                    navigation.navigate("ProfileScreen");
                }}
            />
            <Button
                title="Contact"
                onPress={() => {
                    navigation.navigate("ContactScreen");
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 8,
    },
});

export default Navbar;
