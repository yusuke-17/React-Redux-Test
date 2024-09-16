import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slices/booksSlice";
import modalReducer from "../slices/modalSlice";
import searchReducer from "../slices/searchSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    modal: modalReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
