import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./type";
import { v1 as uuid } from "uuid";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const todoInitialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState: todoInitialState,
  reducers: {
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{
          id: string;
          title: string;
          details: string;
          color: string;
          date: string;
        }>
      ) => {
        state.push(payload);
      },
      prepare: ({
        title,
        details,
        color,
        date,
      }: {
        title: string;
        details: string;
        color: string;
        date: string;
      }) => ({
        payload: {
          id: uuid(),
          title,
          details,
          color,
          date,
        },
      }),
    },
    edit: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        title: string;
        details: string;
        color: string;
      }>
    ) => {
      const todoEdit = state.find((todo) => todo.id === payload.id);
      if (todoEdit) {
        todoEdit.title = payload.title;
        todoEdit.details = payload.details;
        todoEdit.color = payload.color;
      }
    },
    remove: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        title: string;
        details: string;
        color: string;
      }>
    ) => {
      const index = state.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { create, edit, remove } = todoSlice.actions;

const rootReducer = combineReducers({
  todos: todoSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
