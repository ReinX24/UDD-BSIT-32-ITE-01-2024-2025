import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasksList: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchTasks = createAsyncThunk("/tasks/fetchTasks", async () => {
  const storedTasks = await AsyncStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
});

export const addTask = createAsyncThunk(
  // This changes the item in storage
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
  tasksList: [],
  status: "idle",
  error: null,
};

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { getState }) => {
    const state = getState() as { tasks: TasksState };

    const updatedTasks = state.tasks.tasksList.filter((item) => {
      return item.id !== taskId;
    });

    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return taskId;
  }
);

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
        state.tasksList = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        // This changes the state items
        state.tasksList.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasksList = state.tasksList.filter((item) => {
          return item.id !== action.payload;
        });
      });
  },
});

export default tasksSlice.reducer;
