import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "data",
  initialState: {
    list: ["beginning", "logs", "achievements", "creations", "games"],
  },
  reducers: {},
});

//export const { } = navigationSlice.actions;

export default navigationSlice.reducer;
