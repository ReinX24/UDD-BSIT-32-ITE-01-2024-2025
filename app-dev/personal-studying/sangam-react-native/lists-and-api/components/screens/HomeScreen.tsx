import { StackNavigationProp } from "@react-navigation/stack";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Switch,
} from "react-native";
import { RootStackParamList } from "./RootNavigator";
import { useTheme } from "../context/ThemeContext";

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
    {
        id: 4,
        title: "Modal demo",
        screen: "ModalDemo",
    },
    {
        id: 5,
        title: "Pull to refresh demo",
        screen: "PullToRefreshDemo",
    },
    {
        id: 6,
        title: "Data Fetching",
        screen: "DataFetchingDemo",
    },
    {
        id: 7,
        title: "Axios",
        screen: "AxiosDemo",
    },
    {
        id: 8,
        title: "Theme Demo",
        screen: "ThemeDemo",
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

    const { theme, toggleTheme } = useTheme();

    const isDarkMode = theme === "dark";

    const handleRenderItem = ({ item }: TopicProps) => {
        return (
            <TouchableOpacity
                style={[
                    styles.topicButton,
                    {
                        backgroundColor: isDarkMode ? "#f2f2f2" : "#2f2f2f",
                    },
                ]}
                onPress={() => {
                    navigation.navigate(
                        item.screen as keyof RootStackParamList
                    );
                }}
            >
                <Text
                    style={[
                        styles.topicText,
                        {
                            color: isDarkMode ? "#2f2f2f" : "#f2f2f2",
                        },
                    ]}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isDarkMode ? "#2f2f2f" : "#f2f2f2",
                },
            ]}
        >
            <View style={styles.headerContainer}>
                <Text
                    style={[
                        styles.header,
                        {
                            color: isDarkMode ? "#f2f2f2" : "#2f2f2f",
                        },
                    ]}
                >
                    This is the HomeScreen
                </Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#2f2f2f", true: "#81b0ff" }}
                    thumbColor={isDarkMode ? "#f5dd4b" : "#f2f2f2"}
                    ios_backgroundColor={"#3e3e3e"}
                />
            </View>
            <FlatList data={topics} renderItem={handleRenderItem} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
