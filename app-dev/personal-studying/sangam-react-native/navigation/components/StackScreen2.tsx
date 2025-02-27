import { View, Text, Button } from "react-native";
import { StackParamsList } from "./StackNavigationDemo";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type StackScreen2NavigationProp = StackNavigationProp<
    StackParamsList,
    "StackScreen2"
>;

type StackScreen2RouteProp = RouteProp<StackParamsList, "StackScreen2">;

const StackScreen2: React.FC = () => {
    const navigation = useNavigation<StackScreen2NavigationProp>();
    const route = useRoute<StackScreen2RouteProp>();

    return (
        <View>
            <Text>Stack Screen 2</Text>
            <Text>Item ID: {route.params.itemId}</Text>
            <Button
                title="Go back to Stack Screen 1"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </View>
    );
};

export default StackScreen2;
