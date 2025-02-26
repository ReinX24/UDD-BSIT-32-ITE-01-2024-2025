import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { Todo } from "../types";
import React, { useState } from "react";

interface TodoEditProps {
    todo: Todo;
    onSave: (newText: string) => void;
    onCancel: () => void;
}

const TodoEdit: React.FC<TodoEditProps> = ({ todo, onSave, onCancel }) => {
    const [text, setText] = useState(todo?.text);

    const handleSave = () => {
        if (text.trim()) {
            onSave(text.trim());
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleSave}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#2f2f2f",
    },
    input: {
        flex: 1,
        borderBottomColor: "#2f2f2f",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 12,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    saveBtn: {
        backgroundColor: "#2ED1AF",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 4,
    },
    cancelBtn: {
        backgroundColor: "#FA3505",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
    },
    btnText: {
        color: "#f2f2f2",
    },
});

export default TodoEdit;
