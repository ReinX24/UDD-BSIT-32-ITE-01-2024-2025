import {
    Text,
    View,
    TextInput,
    Pressable,
    StyleSheet,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

// Importing the data from a js file
import { data } from "@/data/todos";

export default function Index() {
    // Reversing the order of the data in our file
    const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
    const [text, setText] = useState("");

    const [loaded, error] = useFonts({
        Inter_500Medium,
    });

    if (!loaded && !error) {
        return null;
    }

    const addTodo = () => {
        // Get the text from the text input
        if (text.trim()) {
            // Since the order of the list is reversed, the last item will id
            // number will be the newId number
            const newId = todos.length > 0 ? todos[0].id + 1 : 1;
            setTodos([{ id: newId, title: text, completed: false }, ...todos]);
            setText(""); // reset text back to empty when a todo is added
        }
        // console.log(todos);
    };

    const toggleTodo = (id) => {
        // Iterating through the todo items
        setTodos(
            todos.map((todo) => {
                return todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo;
            })
        );
    };

    const removeTodo = (id) => {
        // Returns todos that are not equal to the passed in id
        setTodos(
            todos.filter((todo) => {
                return todo.id !== id;
            })
        );
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.todoItem}>
                <Text
                    // Applying multiple styles
                    style={[
                        styles.todoText,
                        item.completed && styles.completedText,
                    ]}
                    onPress={() => toggleTodo(item.id)}
                >
                    {item.title}
                </Text>
                <Pressable onPress={() => removeTodo(item.id)}>
                    <MaterialCommunityIcons
                        name="delete-circle"
                        size={36}
                        color="red"
                        selectable={undefined}
                    />
                </Pressable>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new todo"
                    placeholderTextColor="gray"
                    value={text}
                    onChangeText={setText}
                ></TextInput>
                <Pressable onPress={addTodo} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
            </View>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={(todo) => todo.id}
                contentContainerStyle={{ flexGrow: 1 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: "100%",
        backgroundColor: "#494D5F",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    input: {
        flex: 1,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        fontSize: 18,
        minWidth: 0,
        color: "#EDF7F6",
    },
    addButton: {
        backgroundColor: "#EDF7F6",
        borderRadius: 10,
        padding: 10,
    },
    addButtonText: {
        fontSize: 18,
        color: "#494D5F",
    },
    todoItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        padding: 10,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "100%",
        maxWidth: 1024,
        marginHorizontal: "auto",
        pointerEvents: "auto",
    },
    todoText: {
        flex: 1,
        fontSize: 18,
        color: "#EDF7F6",
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "gray",
    },
});
