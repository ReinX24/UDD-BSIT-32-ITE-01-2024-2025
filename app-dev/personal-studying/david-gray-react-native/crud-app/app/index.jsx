import {
    Text,
    View,
    TextInput,
    Pressable,
    StyleSheet,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";

import Animated, { LinearTransition } from "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { StatusBar } from "expo-status-bar";

import Octicons from "@expo/vector-icons/Octicons";

// Importing the data from a js file
import { data } from "@/data/todos";

export default function Index() {
    // Reversing the order of the data in our file
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const [loaded, error] = useFonts({
        Inter_500Medium,
    });

    // useEffect should be before fonts are loaded
    // Getting our data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Getting the stored json value in our local storage
                const jsonValue = await AsyncStorage.getItem("TodoApp");

                // Parsing our json value or returning null
                const storageTodos =
                    jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageTodos && storageTodos.length) {
                    // Setting the todos to stored todos
                    setTodos(storageTodos.sort((a, b) => b.id - a.id));
                } else {
                    // If no todos are stored, get data from data/todos
                    setTodos(data.sort((a, b) => b.id - a.id));
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, [data]);

    // Storing and updating data
    useEffect(() => {
        const storeData = async () => {
            try {
                const jsonValue = JSON.stringify(todos);
                await AsyncStorage.setItem("TodoApp", jsonValue);
            } catch (e) {
                console.error(e);
            }
        };

        storeData();
    }, [todos]);

    if (!loaded && !error) {
        return null;
    }

    // Initializing our styles
    const styles = createStyles(theme, colorScheme);

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
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
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
                <Pressable
                    onPress={() =>
                        setColorScheme(
                            colorScheme === "light" ? "dark" : "light"
                        )
                    }
                    style={{ marginLeft: 10 }}
                >
                    {colorScheme === "dark" ? (
                        <Octicons
                            name="moon"
                            size={36}
                            color={theme.text}
                            selectable={undefined}
                            style={{ width: 36 }}
                        ></Octicons>
                    ) : (
                        <Octicons
                            name="sun"
                            size={36}
                            color={theme.text}
                            selectable={undefined}
                            style={{ width: 36 }}
                        ></Octicons>
                    )}
                </Pressable>
            </View>
            <Animated.FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={(todo) => todo.id}
                contentContainerStyle={{ flexGrow: 1 }}
                itemLayoutAnimation={LinearTransition}
                keyboardDismissMode="on-drag"
            />
        </SafeAreaView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            // width: "100%",
            backgroundColor: theme.background,
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
            fontFamily: "Inter_500Medium",
            minWidth: 0,
            color: theme.text,
        },
        addButton: {
            backgroundColor: theme.button,
            borderRadius: 10,
            padding: 10,
        },
        addButtonText: {
            fontSize: 18,
            color: colorScheme === "dark" ? "black" : "white",
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
            fontFamily: "Inter_500Medium",
            color: theme.text,
        },
        completedText: {
            textDecorationLine: "line-through",
            color: "gray",
        },
    });
}
