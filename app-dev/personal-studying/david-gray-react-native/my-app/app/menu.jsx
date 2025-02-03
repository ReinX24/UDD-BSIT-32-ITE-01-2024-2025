import {
    StyleSheet,
    Appearance,
    Platform,
    SafeAreaView,
    ScrollView,
    FlatList,
    View,
    Text,
    Image,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { MENU_ITEMS } from "@/constants/MenuItems"; // export const
import MENU_IMAGES from "@/constants/MenuImages"; // export default

export default function MenuScreen() {
    const colorScheme = Appearance.getColorScheme();

    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

    const styles = createStyles(theme, colorScheme);

    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;

    // TODO: continue @1:47:45
    const separatorComponent = <View></View>

    return (
        <Container>
            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => {
                    item.id.toString;
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
                // ItemSeparatorComponent={}
                renderItem={({ item }) => (
                    <View>
                        <View>
                            <Text>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </View>
                        <Image source={MENU_IMAGES[item.id - 1]} />
                    </View>
                )}
            ></FlatList>
        </Container>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        contentContainer: {
            paddingTop: 10,
            paddingBottom: 20,
            paddingBottom: 12,
            backgroundColor: theme.background,
        },
    });
}
