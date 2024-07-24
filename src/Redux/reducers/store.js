import { configureStore } from "@reduxjs/toolkit";
import loader from "./loader";

export default configureStore({
  reducer: {
    loader: loader,
  },
});
