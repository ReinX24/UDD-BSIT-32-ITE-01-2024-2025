import { View, Text, SectionList, StyleSheet } from "react-native";

const SECTION_DATA = [
    {
        title: "Men",
        data: ["Men Tshirt 1", "Men Tshirt 2", "Men Jeans 1", "Mean Jeans 2"],
    },
    {
        title: "Women",
        data: [
            "Women Tshirt 1",
            "Women Tshirt 2",
            "Women Jeans 1",
            "Women Jeans 2",
        ],
    },
    {
        title: "Kids",
        data: [
            "Kids Tshirt 1",
            "Kids Tshirt 2",
            "Kids Jeans 1",
            "Kids Jeans 2",
        ],
    },
    {
        title: "Watches",
        data: ["Watches 1", "Watches 2", "Watches 3", "Watches 4"],
    },
];

const SectionListScreen: React.FC = () => {
    const handleRenderItem = ({ item }: { item: string }) => {
        return (
            <View style={styles.item}>
                <Text>{item}</Text>
            </View>
        );
    };

    const handleRenderSectionHeader = ({
        section: { title },
    }: {
        section: { title: string };
    }) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Flatlist Example</Text>
            <SectionList
                sections={SECTION_DATA}
                renderItem={handleRenderItem}
                renderSectionHeader={handleRenderSectionHeader}
                keyExtractor={(item, index) => {
                    return item + index;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#2f2f2f",
    },
    sectionHeader: {
        backgroundColor: "#f2f2f2",
        padding: 8,
    },
    sectionHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default SectionListScreen;
