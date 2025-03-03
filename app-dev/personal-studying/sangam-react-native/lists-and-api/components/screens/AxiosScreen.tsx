import axios from "axios";
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
} from "react-native";
import { useEffect, useState } from "react";

interface Post {
    id: number;
    title: string;
}

// services file -> import
// axios instance
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// request
api.interceptors.request.use((config) => {
    console.log("Request sent: ", config);
    return config;
});

// reponse
api.interceptors.response.use((response) => {
    console.log("Response received: ", response);
    return response;
});

const AxiosScreen = () => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchListsOfPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get<Post[]>("/posts");

            // Delay for 1 second to show loading state
            setTimeout(() => {
                if (response) {
                    setData(response.data);
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

    // console.log(data);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Data Fetching using Axios</Text>
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

export default AxiosScreen;
