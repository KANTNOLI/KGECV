import { useState } from "react";
import style from "./Credits.module.scss";

export const Credits = () => {
  const [active, setActive] = useState(false);

  setTimeout(() => {
    setActive(true);
  }, 10);

  return (
    <section className={active ? style.menuActive : style.menuInactive}>
      <p className={style.title}>Everything involved in this project</p>
      <div className={style.panel}>
        <div className={style.page}>
          <p className={style.question}>developed by</p>
          <p className={style.desc}>Zakhar HUSEV @kantnoli</p>
        </div>
        <div className={style.page}>
          <p className={style.question}>designed by</p>
          <p className={style.desc}>alex dimitrov @xavortm</p>
        </div>
        <div className={style.page}>
          <p className={style.question}>visual assets</p>
          <p className={style.desc}>
            homepage view, achievements by midjourney
            <br />
            <br />
            icons from remixicons and fontawesome
            <br />
            <br />
            hexagons by @xavortm
          </p>
        </div>
        <div className={style.page}>
          <p className={style.question}>audio effects</p>
          <p className={style.desc}>
            click, hover, typing and all other
            <br /> audio effects by mixkit.co
          </p>
        </div>
        <div className={style.page}>
          <p className={style.question}>music</p>
          <p className={style.desc}>
            “tea Fragrance” by Adeline Yeo (HP), Never forget
            <br />
            <br />
            “pressure” by Eggy Toast, Shed Roof
            <br />
            <br />
            “We were kids” by HolinzaPATREON, never forget
          </p>
        </div>
      </div>
    </section>
  );
};
