import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./type";
import { v1 as uuid } from "uuid";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

export const partialList = (
  page: number
) => (dispatch: any, getState: any) => {
  const todoArray = getState().todos;
  const start = (page - 1) * 3;
  const end = ( page * 3 );
  const redefArray = todoArray.slice(start, end);
  redefArray.map((a: any) => console.log(a.title));
  return redefArray;
};

const todoInitialState: Todo[] = [];

const todoSlice = createSlice({
  name: ".",
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
          done: boolean;
        }>
      ) => {
        state.push(payload);
      },
      prepare: ({
        title,
        details,
        color,
        date,
        done,
      }: {
        title: string;
        details: string;
        color: string;
        date: string;
        done: boolean;
      }) => ({
        payload: {
          id: uuid(),
          title,
          details,
          color,
          date,
          done,
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
        done: boolean;
      }>
    ) => {
      const todoEdit = state.find((todo) => todo.id === payload.id);
      if (todoEdit) {
        todoEdit.title = payload.title;
        todoEdit.details = payload.details;
        todoEdit.color = payload.color;
        todoEdit.done = payload.done;
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
    get: (state, payload: PayloadAction<number>) => {
      const start = (payload.payload - 1) * 3;
      const end = ( payload.payload * 3 );
      console.log(start, end);
      
      const redefArray = state.slice(start, end);
      redefArray.map((a) => console.log(a.title));
      console.log(payload);
      return redefArray;
    },
  },
});

export const { create, edit, remove, get } = todoSlice.actions;

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
  middleware: [thunk],
});

export default store;
