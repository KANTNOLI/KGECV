import "./reset.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";

import LocalStoreCheck from "./LocalStore/LocalStoreCheck";
import { loadData } from "./Redux/Slices/dataSlice";
import LocalStoreGet from "./LocalStore/LocalStoreGet";
import LocalStoreSave from "./LocalStore/LocalStoreSave";
import { useEffect } from "react";

import { Beginning } from "./components/Main/screen/Beginning";
import { Logs } from "./components/Main/screen/Logs";
import { Achievements } from "./components/Main/screen/Achievements";
import { Creations } from "./components/Main/screen/Creations";
import { Creation } from "./components/Main/screen/Creation";
import { Games } from "./components/Main/screen/Games";
import { Snake } from "./Games/Snake";
import { JapaneseSimulator } from "./Games/JapaneseSimulator";
import { Avatar } from "./components/Main/screen/Avatar";

import { useHotkeys } from "react-hotkeys-hook";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "./Redux/Slices/dataSlice";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  useEffect(() => {
    LocalStoreCheck()
      ? dispatch(loadData(LocalStoreGet()))
      : LocalStoreSave(data);
  }, []);

  useHotkeys("esc", () => dispatch(setMenu("")));
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main/*" element={<Main />}>
        <Route path="beginning" element={<Beginning />} />
        <Route path="logs" element={<Logs />}></Route>
        <Route path="achievements" element={<Achievements />} />
        <Route path="creations" element={<Creations />} />
        {/*
        main/:creation Нужен для открытия! Я не использую creations/:creation за основу, т.к. мне нужно менять контент на Screen, а не в нем. Это разные разделы!
        Есть еще раздела Games, но там мы переносимся уже на другие сайты. Так что этот способ никак не мешает нам в будущем.
        */}
        <Route path=":creation" element={<Creation />} />
        <Route path="games" element={<Games />} />
        <Route path="snake" element={<Snake />} />
        <Route path="japanesesimulator" element={<JapaneseSimulator />} />
        <Route path="avatar" element={<Avatar />} />
      </Route>
      <Route path="*" element={<h1>error</h1>} />
    </Routes>
  );
}

export default App;
