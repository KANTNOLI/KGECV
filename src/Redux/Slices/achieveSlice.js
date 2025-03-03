import { createSlice } from "@reduxjs/toolkit";
import img from "../../assets/img/test.png";

export const achieveSlice = createSlice({
  // img: scr,
  // importance - важность
  // progress: (true/false) - В процессе,
  // rarity: редкость,
  // description: описание
  name: "data",
  initialState: {
    colors: {
      Legendary: "#e6b23b",
      Epic: "#d34343",
      Rare: "#4aafe8",
      Ordinary: "#5de26a",
    },
    list: [
      {
        img: img,
        ready: true,
        importance: 14,
        progress: false,
        rarity: "Legendary",
        description: "1000 stars on my project",
      },
      {
        img: img,
        ready: true,
        importance: 12,
        progress: false,
        rarity: "Epic",
        description: "500 stars on my project",
      },
      {
        img: img,
        ready: true,
        importance: 10,
        progress: false,
        rarity: "Rare",
        description: "250 stars on my project",
      },
      {
        img: img,
        ready: true,
        importance: 8,
        progress: false,
        rarity: "Ordinary",
        description: "100 stars on my project",
      },
      {
        img: img,
        ready: false,
        importance: 6,
        progress: false,
        rarity: "Legendary",
        description: "1000 stars on my project",
      },
      {
        img: img,
        ready: false,
        importance: 4,
        progress: false,
        rarity: "Epic",
        description: "500 stars on my project",
      },
      {
        img: img,
        ready: false,
        importance: 2,
        progress: true,
        rarity: "Rare",
        description: "250 stars on my project",
      },
      {
        img: img,
        ready: false,
        importance: 0,
        progress: true,
        rarity: "Ordinary",
        description: "100 stars on my project",
      },
    ],
  },
  reducers: {},
});

//export const { } = navigationSlice.actions;

export default achieveSlice.reducer;
