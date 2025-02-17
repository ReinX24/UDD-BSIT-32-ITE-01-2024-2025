import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function EditScreen() {
    const { id } = useLocalSearchParams();
    const [todo, setTodo] = useState({});
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const router = useRouter();
    const [loaded, error] = useFonts({
        Inter_500Medium,
    });

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp");
                const storageTodos =
                    jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageTodos && storageTodos.length) {
                    const myTodo = storageTodos.find((todo) => {
                        return todo.id.toString() === id;
                    });
                    setTodo(myTodo);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData(id);
    }, [id]);

    if (!loaded && !error) {
        return null;
    }

    // Initializing our styles
    const styles = createStyles(theme, colorScheme);

    const handleSave = async () => {
        try {
            const savedTodo = { ...todo, title: todo.title };

            const jsonValue = await AsyncStorage.getItem("TodoApp");

            const storageTodos =
                jsonValue != null ? JSON.parse(jsonValue) : null;

            if (storageTodos && storageTodos.length) {
                const otherTodos = storageTodos.filter((todo) => {
                    // Get all todos except for the one being edited
                    return todo.id !== savedTodo.id;
                });

                // Store otherTodos and add savedTodo, the new edited todo
                const allTodos = [...otherTodos, savedTodo];

                await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos));
            } else {
                await AsyncStorage.setItem(
                    "TodoApp",
                    JSON.stringify([savedTodo])
                );
            }

            router.push("/"); // redirects user to the index page
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            {/* Text input and light and dark theme switcher */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    maxLength={30}
                    placeholder="Edit todo"
                    placeholderTextColor=""
                    value={todo?.title || ""}
                    onChangeText={(text) => {
                        setTodo((prev) => {
                            return { ...prev, title: text };
                        });
                    }}
                ></TextInput>
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

            {/* Save and cancel buttons */}
            <View style={styles.inputContainer}>
                <Pressable onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        router.push("/"); // go back to the index page
                    }}
                    style={[styles.saveButton, { backgroundColor: "red" }]}
                >
                    <Text style={[styles.saveButtonText, { color: "white" }]}>
                        Cancel
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            backgroundColor: theme.background,
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            padding: 10,
            gap: 6,
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
        saveButton: {
            backgroundColor: theme.button,
            borderRadius: 10,
            padding: 10,
        },
        saveButtonText: {
            fontSize: 18,
            color: colorScheme === "dark" ? "black" : "white",
        },
    });
}
