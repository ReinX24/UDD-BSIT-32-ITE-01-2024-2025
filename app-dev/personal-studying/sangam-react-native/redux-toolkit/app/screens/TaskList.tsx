import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import {
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  addTask,
  deleteTask,
  fetchTasks,
  Task,
  toggleTask,
} from "../store/tasksSlice";
import {
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

const TaskList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => {
    return state.tasks.tasksList;
  });
  const status = useSelector((state: RootState) => {
    return state.tasks.status;
  });

  console.log(tasks, "tasksList");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

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

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      "Delete task",
      "Are you sure that you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            return dispatch(deleteTask(taskId));
          },
        },
      ]
    );
  };

  const createRenderTask = ({ item }: { item: Task }) => {
    return (
      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        layout={LinearTransition.springify()}
      >
        <TouchableOpacity
          style={[styles.taskItem, item.completed && styles.completedTaskItem]}
          onPress={() => {
            dispatch(toggleTask(item.id));
          }}
        >
          <Text
            style={[
              styles.taskItemText,
              item.completed && styles.completedTaskItemText,
            ]}
          >
            {item.title}
          </Text>

          <TouchableOpacity
            style={styles.deleteTaskButton}
            onPress={() => {
              handleDeleteTask(item.id);
            }}
          >
            <Text style={styles.deleteTaskButtonText}>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Render list of tasks here */}
      <FlatList
        data={tasks}
        renderItem={createRenderTask}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
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
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    elevation: 2,
  },
  completedTaskItem: {
    opacity: 0.7,
  },
  taskItemText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  completedTaskItemText: {
    textDecorationLine: "line-through",
  },
  deleteTaskButton: {
    backgroundColor: "#D34909",
    padding: 12,
    borderRadius: 40,
  },
  deleteTaskButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default TaskList;
