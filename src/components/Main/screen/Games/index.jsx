import { Link } from "react-router-dom";
import style from "./Games.module.scss";
import game from "../../../../assets/img/game.png";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../Redux/Slices/dataSlice";
import SoundSnippet from "../../../../Sound/SoundSnippet";

export const Games = () => {
  const data = useSelector((state) => state.data.data)
  const dispatch = useDispatch()
  return (
    <section className={style.games}>
      <p className={style.gamesTitle}>mini games</p>
      <div className={style.gameList}>
        <a href="#">
          <div className={style.game}>
            <Link to="/main/snake">
              <img onClick={() => {
                SoundSnippet({
                  style: 4,
                  crop: 0.1,
                  settings: data.settings,
                })
                dispatch(setPage({ name: "snake", id: 4 }))
              }} src={game} alt="da" />
              <p className={style.gameTitle}>snake</p>
              <p className={style.gameDesc}>classic snake game</p>
            </Link>
          </div>
        </a>
        <a href="#">
          <div className={style.game}>
            <Link to="/main/japanesesimulator">
              <img onClick={() => {
                SoundSnippet({
                  style: 4,
                  crop: 0.1,
                  settings: data.settings,
                })
                dispatch(setPage({ name: "snake", id: 4 }))
              }} src={game} alt="da" />
              <p className={style.gameTitle}>Japanese Simulator</p>
              <p className={style.gameDesc}>classic Japanese Simulator game</p>
            </Link>
          </div>
        </a>
        <a href="#">
          <div className={style.game}>
            <img src={game} alt="da" />
            <p className={style.gameTitle}>gain life</p>
            <p className={style.gameDesc}>click the hearts</p>
          </div>
        </a>
        <a href="#">
          <div className={style.game}>
            <img src={game} alt="da" />
            <p className={style.gameTitle}>gain life</p>
            <p className={style.gameDesc}>click the hearts</p>
          </div>
        </a>
        <a href="#">
          <div className={style.game}>
            <img src={game} alt="da" />
            <p className={style.gameTitle}>gain life</p>
            <p className={style.gameDesc}>click the hearts</p>
          </div>
        </a>
        <a href="#">
          <div className={style.game}>
            <img src={game} alt="da" />
            <p className={style.gameTitle}>gain life</p>
            <p className={style.gameDesc}>click the hearts</p>
          </div>
        </a>
      </div>
      <p className={style.comments}>
        Here you will see a few mini games I implemented in React or in Canvas.
        <br />
        <br />
        Have fun!
      </p>
    </section>
  );
};
