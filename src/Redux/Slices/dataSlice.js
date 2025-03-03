import { createSlice } from "@reduxjs/toolkit";
import LocalStoreSave from "../../LocalStore/LocalStoreSave";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: {
      //Типичные данные, после первой отправки
      login: "",
      email: "",
      lvl: 1,
      coins: 100,
      //Настройки пользователя
      settings: {
        //Звуковые эффекты
        sounds: true,
        music: true,
        //Главные эффекты
        visual: {
          HUE: 0,
          volume: 0.2,
        },
      },
      //Активная страница
      page: {
        id: 0,
        name: "beginning",
      },
      //Активная меню
      menu: {
        name: "",
        style: 0,
      },
      games: {
        snake: {
          best: {
            bestSize: 0,
            lastBestSize: 0,
            bestCoins: 0,
          },
          attempts: 0,
        },
        JapaneseSimulator: {
          best: {
            time: 0,
            example: 0,
            et: 0,
          },
          attempts: 0,
        },
      },
    },
  },
  reducers: {
    getCoin: (state, action) => {
      //Добавление коинов при нажатии
      state.data.coins += action.payload.state ? 1 : action.payload.coins;
      LocalStoreSave(state.data);
    },
    setPage: (state, action) => {
      //Отрисовка страницы
      state.data.page.id = action.payload.id;
      state.data.page.name = action.payload.name;
      LocalStoreSave(state.data);
    },
    setMenu: (state, action) => {
      //Взаимодействие с меню
      state.data.menu.name = action.payload.name;
      state.data.menu.style = action.payload.style;
      LocalStoreSave(state.data);
    },
    setSettings: (state, action) => {
      //Сохранение  новый данных в настр
      state.data.settings.visual.HUE = action.payload.HUE;
      state.data.settings.visual.volume = action.payload.volume;
      LocalStoreSave(state.data);
    },
    setSound: (state, action) => {
      //Вкл/выкл эффектов
      state.data.settings.sounds = action.payload;
      LocalStoreSave(state.data);
    },
    setMusic: (state, action) => {
      //Вкл/выкл Музыки
      state.data.settings.music = action.payload;
      LocalStoreSave(state.data);
    },
    loadData: (state, action) => {
      //Получение данных с локал
      state.data = action.payload;
      LocalStoreSave(state.data);
    },
    loadEmail: (state, action) => {
      //Сохр данных отправителя
      state.data.login = action.payload.login;
      state.data.email = action.payload.email;
      LocalStoreSave(state.data);
    },

    setAttemptsSnake: (state) => {
      //+ попытка
      state.data.games.snake.attempts += 1;
      LocalStoreSave(state.data);
    },
    setBestSizeSnake: (state, action) => {
      //лучший размер
      state.data.games.snake.best.bestSize = action.payload;
      LocalStoreSave(state.data);
    },
    setBestCoinsSnake: (state, action) => {
      //лучший выйгрыш
      state.data.games.snake.best.bestCoins = action.payload;
      LocalStoreSave(state.data);
    },

    setAttemptsJapanese: (state) => {
      //+ попытка
      state.data.games.JapaneseSimulator.attempts += 1;
      LocalStoreSave(state.data);
    },
    setBestExampleJapanese: (state, action) => {
      state.data.games.JapaneseSimulator.best.example = action.payload;
      LocalStoreSave(state.data);
    },
    setBestTimeJapanese: (state, action) => {
      state.data.games.JapaneseSimulator.best.time = action.payload;
      LocalStoreSave(state.data);
    },
  },
});

export const {
  getCoin,
  setPage,
  setMenu,
  setSettings,
  setSound,
  setMusic,
  loadData,
  loadEmail,
  setAttemptsSnake,
  setBestCoinsSnake,
  setBestSizeSnake,
  setAttemptsJapanese,
  setBestExampleJapanese,
  setBestTimeJapanese,
} = dataSlice.actions;

export default dataSlice.reducer;
