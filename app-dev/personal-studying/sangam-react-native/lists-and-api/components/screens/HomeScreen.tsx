import { StackNavigationProp } from "@react-navigation/stack";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "./RootNavigator";
// import { useNavigation } from "@react-navigation/native";

const topics = [
    {
        id: 1,
        title: "Flat list demo",
        screen: "FlatListDemo",
    },
    {
        id: 2,
        title: "Section list demo",
        screen: "SectionListDemo",
    },
    {
        id: 3,
        title: "Touchable screen demo",
        screen: "TouchableScreenDemo",
    },
];

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
    navigation: HomeScreenNavigationProp;
};

type TopicProps = {
    item: {
        id: number;
        title: string;
        screen: string;
    };
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    // const navigation = useNavigation<HomeScreenNavigationProp>();

    const handleRenderItem = ({ item }: TopicProps) => {
        return (
            <TouchableOpacity
                style={styles.topicButton}
                onPress={() => {
                    navigation.navigate(
                        item.screen as keyof RootStackParamList
                    );
                }}
            >
                <Text style={styles.topicText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>This is the HomeScreen</Text>
            <FlatList data={topics} renderItem={handleRenderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    topicButton: {
        backgroundColor: "#2f2f2f",
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    topicText: {
        fontSize: 18,
        fontWeight: "semibold",
        color: "#f2f2f2",
    },
});

export default HomeScreen;
