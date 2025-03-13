import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity, Modal, KeyboardAvoidingView } from "react-native";

const TaskList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <View style={styles.container}>
      {/* Render list of tasks here */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer}>
          <View style={styles.modalContent}></View>
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
  modalContent: {},
});

export default TaskList;
