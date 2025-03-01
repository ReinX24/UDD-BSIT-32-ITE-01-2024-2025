import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { StackParamsList } from "./StackNavigationDemo";
import { StackNavigationProp } from "@react-navigation/stack";

type StackScreen1NavigationProp = StackNavigationProp<
    StackParamsList,
    "StackScreen1"
>;

const StackScreen1: React.FC = () => {
    const navigation = useNavigation<StackScreen1NavigationProp>();

    return (
        <View>
            <Text>Stack Screen 1</Text>
            <Button
                title="Item 1"
                onPress={() => {
                    navigation.navigate("StackScreen2", {
                        itemId: 1,
                    });
                }}
            />

            <Button
                title="Item 2"
                onPress={() => {
                    navigation.navigate("StackScreen2", {
                        itemId: 2,
                    });
                }}
            />
        </View>
    );
};

export default StackScreen1;
