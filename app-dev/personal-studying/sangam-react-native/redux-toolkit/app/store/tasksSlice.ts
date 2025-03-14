import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const addTask = createAsyncThunk(
  "tasks/addTask",
  // Do not require id from the new task
  async (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now().toString() };
    const storedTasks = await AsyncStorage.getItem("tasks");

    // Converting JSON string into an object if it exists, else return empty array
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(newTask);
    console.log(tasks);
  }
);

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: {},
  reducers: {},
});

export default projectsSlice.reducer;
