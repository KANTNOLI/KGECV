import { useSelector } from "react-redux";
import style from "./Home.module.scss";
import { Link } from "react-router-dom";
import SoundSnippet from "../../Sound/SoundSnippet";


const Home = () => {
  const data = useSelector((state) => state.data.data);
  const HUE = data.settings.visual.HUE;
  
  return (
    <main style={{ "--deg": HUE + "deg" }} className={style.main}>
      <div className="light"></div>
      <section className={style.wrapper}>
        <div className={style.hi}>
          <p>HI!</p>
        </div>
        <div className={style.info}>
          <h1 className={style.title}>WELCOME TO BY PERSONAL WEBSITE</h1>
          <h2 className={style.decription}>
            I have created this website to feel like a game/sci-fi interface.
            All text inside tries to reflect this.
            <br />
            <br />
            You will find ‘achievements’ or ‘quests’ that show the progress in
            my professional life and are related to what I am working on.
          </h2>

          <Link to={"/main/" + data.page.name}>
            <button
              onClick={() =>
                SoundSnippet({
                  style: 3,
                  crop: 0,
                  settings: data.settings,
                })
              }
              className={style.button}
            >
              ENTER THE SYSTEM
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
