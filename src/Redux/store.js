import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/dataSlice";
import navigationReducer from "./Slices/navigationSlice";
import filterReducer from "./Slices/filterSlice";
import achieveReducer from "./Slices/achieveSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
    navigation: navigationReducer,
    filter: filterReducer,
    achievements: achieveReducer,
  },
});
