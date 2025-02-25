import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Todo } from "../types";

interface TodoItemProps {
    todo: Todo;
    onDelete: () => void;
    onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
    // console.log(todo, "todo from todoitem component");

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.todoText} onPress={onToggle}>
                <Text
                    style={[
                        styles.text,
                        // If the todo is true, then apply completedText styles
                        todo?.completed && styles.completedText,
                    ]}
                >
                    {todo.text}
                </Text>
            </TouchableOpacity>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#2f2f2f",
    },
    todoText: {
        flex: 1,
    },
    text: {
        fontSize: 18,
        color: "#2f2f2f",
        fontWeight: "bold",
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "#888888",
    },
    btnContainer: {
        flexDirection: "row",
    },
    editBtn: {
        backgroundColor: "#007aff",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 4,
    },
    deleteBtn: {
        backgroundColor: "#FA3505",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
    },
    btnText: {
        color: "#f2f2f2",
    },
});

export default TodoItem;
