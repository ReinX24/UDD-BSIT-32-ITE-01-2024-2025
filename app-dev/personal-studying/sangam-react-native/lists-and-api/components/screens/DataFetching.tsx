import { useDebugValue, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";

interface Post {
    id: number;
    title: string;
}

const DataFetching = () => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchListsOfPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            const data: Post[] = await response.json();

            // Delay for 1 second to show loading state
            setTimeout(() => {
                if (data) {
                    setData(data);
                    setLoading(false);
                } else {
                    setData([]);
                    setLoading(false);
                }
            }, 1000);
        } catch (e) {
            console.error(e);
        }
    };

    const handleRenderItem = ({ item }: { item: Post }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    };

    useEffect(() => {
        fetchListsOfPosts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Data Fetching</Text>
            {loading ? (
                <ActivityIndicator
                    style={styles.loader}
                    size={"large"}
                    color={"#000fff"}
                />
            ) : (
                <FlatList
                    data={data}
                    renderItem={handleRenderItem}
                    keyExtractor={(item) => {
                        return item.id.toString();
                    }}
                    showsVerticalScrollIndicator={false}
                />
            )}
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
    item: {
        backgroundColor: "#2f2f2f",
        padding: 20,
        marginBottom: 8,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#f2f2f2",
    },
    loader: {
        marginVertical: 20,
    },
});

export default DataFetching;
