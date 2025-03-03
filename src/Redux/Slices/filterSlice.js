import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "data",
  initialState: {
    //Теги для фильтрации
    titles: ["achieved", "progress", "todo", "all"],
  },
  reducers: {},
});

//export const { } = filterSlice.actions;

export default filterSlice.reducer;
