import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from "react-native";

const INITIAL_DATA = Array.from({ length: 20 }, (_, index) => {
    return {
        id: index.toString(),
        title: `Item ${index + 1}`,
    };
});

const PullToRefesh = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);
    const [loading, setLoading] = useState(false);

    const handleRenderItem = ({
        item,
    }: {
        item: { id: string; title: string };
    }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.title}</Text>
            </View>
        );
    };

    const loadMoreItems = () => {
        if (!loading) {
            setLoading(true);
            // Load more items here
            // Adds a 1 second delay and loads more items
            setTimeout(() => {
                const newItems = Array.from({ length: 10 }, (_, index) => {
                    return {
                        id: (data.length + index).toString(),
                        title: `Item ${data.length + index + 1}`,
                    };
                });

                setData([...data, ...newItems]);
                setLoading(false);
            }, 1000);
        }
    };

    const handleOnRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setData(INITIAL_DATA);
            setRefreshing(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                Large List with pull to refresh and Infinite Scrolling
            </Text>
            <FlatList
                data={data}
                renderItem={handleRenderItem}
                keyExtractor={(item) => {
                    return item.id;
                }}
                onEndReached={loadMoreItems}
                onEndReachedThreshold={0.1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleOnRefresh}
                    />
                }
                ListFooterComponent={
                    loading ? (
                        <ActivityIndicator
                            style={styles.loader}
                            size={"large"}
                            color={"#000fff"}
                        />
                    ) : null
                }
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
    itemText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    loader: {
        marginVertical: 20,
    },
});

export default PullToRefesh;
