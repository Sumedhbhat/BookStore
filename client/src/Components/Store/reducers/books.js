import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../firebase";
import {
  getDocs,
  doc,
  addDoc,
  collection,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const initialState = {
  books: [],
  loading: true,
  empty: false,
  error: false,
  count: 0,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (thunkAPI) => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const books = [];
    querySnapshot.docs.map((doc) => {
      const arr = { id: doc.id, ...doc.data() };
      if (books.find((book) => book.id === arr.id) === undefined) {
        books.push(arr);
      }
    });
    return books;
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (book, thunkAPI) => {
    await addDoc(collection(db, "books"), book);
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, values }, thunkAPI) => {
    await setDoc(doc(db, "books", id), values, { merge: true });
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, thunkAPI) => {
    await deleteDoc(doc(db, "books", id));
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.loading = false;
      if (state.books.length === 0) {
        state.empty = true;
      }
    });
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addBook.fulfilled, (state) => {
      state.count += 1;
      state.loading = false;
      state.empty = false;
    });
    builder.addCase(addBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBook.rejected, (state) => {
      state.count += 1;
      state.loading = false;
      state.error = true;
    });
    builder.addCase(deleteBook.fulfilled, (state) => {
      state.count += 1;
      state.loading = false;
      state.empty = false;
    });
    builder.addCase(deleteBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBook.rejected, (state) => {
      state.count += 1;
      state.loading = false;
      state.error = true;
    });
    builder.addCase(updateBook.fulfilled, (state) => {
      state.count += 1;
      state.loading = false;
      state.empty = false;
    });
    builder.addCase(updateBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBook.rejected, (state) => {
      state.count += 1;
      state.loading = false;
      state.error = true;
    });
  },
});

export default booksSlice.reducer;
