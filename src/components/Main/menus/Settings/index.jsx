import { useState } from "react";
import style from "./Settings.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setMenu } from "../../../../Redux/Slices/dataSlice";
import { setSettings } from "../../../../Redux/Slices/dataSlice";
import settingDesc from "../../../../assets/img/settingsDesc.png";
import SoundSnippet from "../../../../Sound/SoundSnippet";

export const Settings = () => {
  //Для анимации, используется во всех menu
  const [active, setActive] = useState(false);
  const data = useSelector((state) => state.data.data);
  const visual = useSelector((state) => state.data.data.settings.visual);
  const dispatch = useDispatch();

  //Динамичные настрйоки, для визуального примера
  const [HUE, setHUE] = useState(visual.HUE);
  const [volume, setVolume] = useState(visual.volume * 100);

  function handleChangeHUE(e) {
    setHUE(e.target.value);
  }

  function handleChangeVolume(e) {
    setVolume(e.target.value);
  }

  setTimeout(() => {
    setActive(true);
  }, 10);

  return (
    <section
      style={{ "--deg2": HUE - visual.HUE + "deg" }}
      className={active ? style.menuActive : style.menuInactive}
    >
      <p className={style.BigTitle}>visual configurator</p>
      <p className={style.title}>apply what works best for you</p>
      <div className={style.panel}>
        <div className={style.settingPanel}>
          <div className={style.panelTitles}>
            <p className={style.panelTitleFirst}>HUD HUE</p>
            <p className={style.panelTitleSecond}>
              Color: <span>{HUE}</span> deg
            </p>
          </div>
          <input
            value={HUE}
            onClick={() =>
              SoundSnippet({
                style: 1,
                crop: 0.155,
                settings: data.settings,
              })
            }
            onChange={handleChangeHUE}
            type="range"
            min="0"
            max="360"
            id="score"
          />
        </div>

        <div className={style.settingPanel}>
          <div className={style.panelTitles}>
            <p className={style.panelTitleFirst}>sound volume</p>
            <p className={style.panelTitleSecond}>
              <span>{volume}</span> %
            </p>
          </div>
          <input
            value={volume}
            onClick={() =>
              SoundSnippet({
                style: 1,
                crop: 0.155,
                settings: data.settings,
              })
            }
            onChange={handleChangeVolume}
            type="range"
            min="0"
            max="100"
            id="score"
          />
        </div>

        <div className={style.panelDesc}>
          <img src={settingDesc} alt="" />
          <p>
            The configuration data is stored in your browser. If you login from
            a different browser or machine, your settings will not apply.
          </p>
        </div>
      </div>

      <div className={style.btns}>
        <button
          onClick={() => {
            SoundSnippet({
              style: 0,
              crop: 0.2,
              settings: data.settings,
            });

            dispatch(setSettings({ HUE: HUE, volume: volume / 100 }));
          }}
          className={style.send}
        >
          write to disk [enter]
        </button>

        <button
          onClick={() => {
            SoundSnippet({
              style: 1,
              crop: 0,
              settings: data.settings,
            });

            dispatch(
              setMenu({
                name: "",
                style: 0,
              })
            );
          }}
          className={style.discard}
        >
          discard [esc]
        </button>
      </div>
    </section>
  );
};
