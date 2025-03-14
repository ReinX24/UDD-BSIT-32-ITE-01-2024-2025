import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const fetchTasks = createAsyncThunk("/tasks/fetchTasks", async () => {
  const storedTasks = await AsyncStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  // Do not require id from the new task
  async (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now().toString() };
    const storedTasks = await AsyncStorage.getItem("tasks");

    // Converting JSON string into an object if it exists, else return empty array
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(newTask);

    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    return newTask;
  }
);

const tasksInitialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export default tasksSlice.reducer;
