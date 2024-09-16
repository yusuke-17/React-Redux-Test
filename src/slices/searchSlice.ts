import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookDescription } from "../types/BookDescription";

// 非同期処理の追加: Google Books API から本を検索する
export const fetchBooks = createAsyncThunk(
  "search/searchBooks",
  async ({
    title,
    author,
    maxResults,
  }: {
    title: string;
    author: string;
    maxResults: number;
  }) => {
    let url = "https://www.googleapis.com/books/v1/volumes?q=";
    if (title) url += `intitle:${title}`;
    if (author) url += `inauthor:${author}`;
    url += `&maxResults=${maxResults}`;

    const response = await fetch(url);
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((item: any) => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors.join(", "),
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    }));
  }
);

type SearchState = {
  title: string;
  author: string;
  books: BookDescription[];
  isSearching: boolean;
};

const initialState: SearchState = {
  title: "",
  author: "",
  books: [],
  isSearching: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    clearSearch: (state) => {
      state.books = [];
      state.title = "";
      state.author = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(
        fetchBooks.fulfilled,
        (state, action: PayloadAction<BookDescription[]>) => {
          state.books = action.payload;
          state.isSearching = false;
        }
      )
      .addCase(fetchBooks.rejected, (state) => {
        state.isSearching = false;
      });
  },
});

export const { setTitle, setAuthor, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
