import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RootStackParamsList } from "../components/RootNavigator";

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamsList,
    "Home"
>;

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <Button
                title="Contact"
                onPress={() => {
                    navigation.navigate("Contact");
                }}
            ></Button>
            <Button
                title="Stack Navigator Demo"
                onPress={() => {
                    navigation.navigate("StackDemo");
                }}
            ></Button>
            <Button
                title="Tab Navigator Demo"
                onPress={() => {
                    navigation.navigate("TabDemo");
                }}
            ></Button>
            <Button
                title="Drawer Navigator Demo"
                onPress={() => {
                    navigation.navigate("DrawerDemo");
                }}
            ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontWeight: "bold",
        fontSize: 24,
    },
});

export default HomeScreen;
