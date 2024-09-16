import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookDescription } from "../types/BookDescription";
import { BookToRead } from "../types/BookToRead";

type BooksState = {
  books: BookToRead[];
};

const initialState: BooksState = {
  books: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookDescription>) => {
      const newBook: BookToRead = {
        ...action.payload,
        id: Date.now(),
        memo: "",
      };
      state.books.push(newBook);
    },
    updateBookMemo: (
      state,
      action: PayloadAction<{ id: number; memo: string }>
    ) => {
      const newBooks = state.books.map((book) => {
        if (book.id === action.payload.id) {
          return { ...book, memo: action.payload.memo };
        }
        return book;
      });
      state.books = newBooks;
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      const newBooks = state.books.filter((book) => book.id !== action.payload);
      state.books = newBooks;
    },
  },
});

export const { addBook, updateBookMemo, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;
