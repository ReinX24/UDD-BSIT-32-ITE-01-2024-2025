import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addTask } from "../store/tasksSlice";

const TaskList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // TODO: show stored tasks here

  const handleAddNewTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          title: newTaskTitle.trim(),
          completed: false,
        })
      );

      setNewTaskTitle("");
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Render list of tasks here */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Add New Task</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              placeholder="Enter task title"
              placeholderTextColor="#999999"
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAddNewTask}
              >
                <Text style={styles.closeButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#6200ee",
    width: 88,
    height: 44,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  addButtonText: {
    color: "#f2f2f2",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2f2f2f",
  },
  closeButton: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  closeButtonText: {
    color: "#f2f2f2",
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 40,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#D37C09",
  },
  submitButton: {
    backgroundColor: "#008080",
  },
});

export default TaskList;
