import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";

interface TodoInputProps {
    onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
    const [text, setText] = useState("");

    const handleAddTodo = () => {
        if (text.trim()) {
            onAddTodo(text.trim());
            setText("");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Add a new Todo..."
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAddTodo}
            ></TextInput>
            <TouchableOpacity onPress={handleAddTodo} style={styles.addTodoBtn}>
                <Text style={styles.addTodoBtnText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#2f2f2f",
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 10,
        borderRadius: 8,
    },
    addTodoBtn: {
        backgroundColor: "#2f2f2f",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addTodoBtnText: {
        color: "#f2f2f2",
        fontWeight: "bold",
    },
});

export default TodoInput;
