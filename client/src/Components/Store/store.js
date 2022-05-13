import { configureStore } from "@reduxjs/toolkit";
import books from "./reducers/books";
import user from "./reducers/user";

export const store = configureStore({
  reducer: {
    books: books,
    user,
  },
});
