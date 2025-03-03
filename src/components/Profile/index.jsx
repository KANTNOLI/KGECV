// eslint-disable-next-line no-unused-vars
import React, { useMemo } from "react";
import avatar from "../../assets/img/avatar.jpg";
import social from "../../assets/img/social.png";
import style from "./Profile.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenu, setPage } from "../../Redux/Slices/dataSlice";
import SoundSnippet from "../../Sound/SoundSnippet";

export const Profile = () => {
  const data = useSelector((state) => state.data.data);
  const HUE = 360 - data.settings.visual.HUE;
  const dispatch = useDispatch();

  return (
    <section className={style.profile}>
      <div>
        <div className={style.avatar}>
          <div className={style.leftTop}></div>
          <div className={style.leftBottom}></div>
          <div className={style.rightTop}></div>
          <div className={style.rightBottom}></div>
          <Link to="/main/avatar">
            <img onClick={() =>
              dispatch(setPage({ name: "profile", id: 6 }))
            } style={{ "--deg": HUE + "deg" }} src={avatar} alt="avatar" />
          </Link>
        </div>

        <div className={style.bio}>
          <div>
            <p className={style.title}>name</p>
            <p className={style.description}>KANTNOLI</p>
          </div>
          <div>
            <p className={style.title}>occupation</p>
            <p className={style.description}>web developer</p>
          </div>
          <div>
            <p className={style.title}>corporation</p>
            <p className={style.description}>Legacy.ai</p>
          </div>
          <div>
            <p className={style.title}>availability</p>
            <button
              onClick={() => {
                SoundSnippet({
                  style: 2,
                  crop: 0.91,
                  settings: data.settings,
                });
                dispatch(setMenu({ name: "hire", style: 1 }));
              }}
              className={style.availability}
            >
              open for hire
            </button>
          </div>
          <div>
            <p className={style.title}>social</p>

            <button
              onClick={() => {
                SoundSnippet({
                  style: 2,
                  crop: 0.91,
                  settings: data.settings,
                });
                dispatch(
                  setMenu({
                    name: "connect",
                    style: 1,
                  })
                );
              }}
              className={style.btn2}
            >
              open connection <img src={social} alt="social" />
            </button>
          </div>
        </div>
      </div>

      <div className={style.motto}>
        <p className={style.title}>Motto:</p>
        <p className={style.description}>
          As usual, the deadline is yesterday!
        </p>
      </div>
    </section>
  );
};
