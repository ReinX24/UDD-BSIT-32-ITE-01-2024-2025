import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Todo } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todoList: Todo[];
    onDeleteTodo: (id: string) => void;
    onToggleTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todoList,
    onDeleteTodo,
    onToggleTodo,
}) => {
    return (
        <ScrollView style={styles.container}>
            {todoList.map((todoItem) => {
                return (
                    <TodoItem
                        todo={todoItem}
                        key={todoItem.id}
                        onDelete={() => {
                            onDeleteTodo(todoItem?.id);
                        }}
                        onToggle={() => {
                            onToggleTodo(todoItem?.id);
                        }}
                    ></TodoItem>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default TodoList;
