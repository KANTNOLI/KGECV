import style from "./Quest.module.scss";
import reward1 from "../../assets/img/reward1.png";
import reward2 from "../../assets/img/reward2.png";
import { useSelector, useDispatch } from "react-redux";
import { setSound, setMusic } from "../../Redux/Slices/dataSlice";
import { setMenu } from "../../Redux/Slices/dataSlice";

import SoundSnippet from "../../Sound/SoundSnippet";

const Quest = () => {
  const data = useSelector((state) => state.data.data);
  const sound = useSelector((state) => state.data.data.settings.sounds);
  const music = useSelector((state) => state.data.data.settings.music);
  const dispatch = useDispatch();


  return (
    <section className={style.section}>
      <div className={style.activeQuest}>
        <span className={style.title}>active quest</span>
        <span className={style.titleDesc}>the react skill-up line</span>

        <div className={style.content}>
          <div className={style.sect}>
            <p className={style.nameTitle}>quest name</p>
            <p className={style.nameDesc}>React website</p>
          </div>
          <div className={style.sect}>
            <p className={style.nameTitle}>goal</p>
            <p className={style.nameDesc2}>
              Build this website. Implement a full react website with multiple
              routers, UI elements and tricky styling. Make it all work great!
            </p>
          </div>
          <div className={style.sect}>
            <p className={style.nameTitle}>rewards</p>
            <div className={style.rewards}>
              <div className={style.reward}>
                <img src={reward1} alt="reward" />
                <p>+5</p>
              </div>

              <div className={style.reward}>
                <img src={reward2} alt="reward" />
                <p>+25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.setting}>
        <div
          className={sound ? style.settingBtnActive : style.settingBtnInactive}
        >
          <p>sound effects</p>
          <button
            onClick={() => {
              SoundSnippet({
                style: 5,
                crop: 0.35,
                settings: data.settings,
              });
              dispatch(setSound(!sound));
            }}
          ></button>
        </div>

        <div
          className={music ? style.settingBtnActive : style.settingBtnInactive}
        >
          <p>music</p>
          <button
            onClick={() => {
              SoundSnippet({
                style: 5,
                crop: 0.35,
                settings: data.settings,
              });

              dispatch(setMusic(!music));
            }}
          ></button>
        </div>

        <button
          onClick={() => {
            SoundSnippet({
              style: 2,
              crop: 0.91,
              settings: data.settings,
            });
            dispatch(
              setMenu({
                name: "settings",
                style: 2,
              })
            );
          }}
          className={style.openSetting}
        >
          <p>visual settings</p>
          <span></span>
        </button>
      </div>
    </section>
  );
};

export default Quest;
