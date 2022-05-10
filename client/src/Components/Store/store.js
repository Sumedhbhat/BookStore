import { configureStore } from "@reduxjs/toolkit";
import books from "./reducers/books";

export const store = configureStore({
  reducer: {
    books,
  },
});
