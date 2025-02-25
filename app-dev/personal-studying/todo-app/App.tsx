import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import { Todo } from "./types";

export default function App() {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const addTodo = (text: string) => {
        // console.log(text);

        setTodoList(
            [
                ...todoList,
                {
                    id: Date.now().toString(),
                    text,
                    completed: false,
                },
                // Sorts the list where the latest item goes first
            ].sort((a, b) => Number(b.id) - Number(a.id))
        );
    };

    const deleteTodo = (id: string) => {
        setTodoList(
            // Filter items, return items that are not the same as the one on the page
            todoList.filter((item) => {
                return item.id !== id;
            })
        );
    };

    const toggleTodo = (id: string) => {
        setTodoList(
            todoList.map((todoItem) => {
                return todoItem.id === id
                    ? { ...todoItem, completed: !todoItem.completed }
                    : todoItem;
            })
        );
    };

    // console.log(todoList);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Todo App</Text>
            <TodoInput onAddTodo={addTodo} />
            <TodoList
                todoList={todoList}
                onDeleteTodo={deleteTodo}
                onToggleTodo={toggleTodo}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f2f2f2",
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        paddingBottom: 8,
        textAlign: "center",
        borderBottomColor: "#2f2f2f",
        borderTopColor: "#f2f2f2",
        borderLeftColor: "#f2f2f2",
        borderRightColor: "#f2f2f2",
        borderWidth: 1,
    },
});
