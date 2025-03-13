import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./tasksSlice";
import projectsReducer from "./projectsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
