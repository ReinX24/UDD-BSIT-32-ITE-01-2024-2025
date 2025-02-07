import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

const Task = () => {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    const addTask = () => {
        if (task.trim()) {
            setTodos([
                ...todos,
                { id: Date.now().toString(), text: task, completed: false },
            ]);
            setTask("");
        }
    };

    const toggleTaskCompletion = (id) => {
        // console.log(todo.id);
        setTodos(
            todos.map((todo) =>
                todo.id == id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTask = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/favicon.png")} style={styles.image}></Image>

            <TextInput
                style={styles.input}
                placeholder="Add a new task"
                value={task}
                onChangeText={setTask}
            ></TextInput>
            <Button title="Add Task" onPress={addTask}></Button>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity
                            onPress={() => toggleTaskCompletion(item.id)}
                        >
                            <Text
                                style={[
                                    styles.todoText,
                                    item.completed && styles.completed,
                                    // styles.completed
                                ]}
                            >
                                {item.text}
                            </Text>
                        </TouchableOpacity>
                        <Button
                            title="Delete"
                            onPress={() => {
                                deleteTask(item.id);
                            }}
                            color="red"
                        ></Button>
                    </View>
                )}
            ></FlatList>
        </View>
    );
};

export default Task;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    todoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    todoText: {
        fontSize: 18,

        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    completed: {
        textDecorationLine: "line-through",
        color: "gray",
    },
    image: {
        marginHorizontal: "auto",
        marginBottom: 16
    }
});
