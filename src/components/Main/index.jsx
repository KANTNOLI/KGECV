import Header from "../Header";
import { Profile } from "../Profile";
import { Outlet } from "react-router-dom";
import { Hire } from "./menus/Hire";
import { Connect } from "./menus/Connect";
import { Credits } from "./menus/Credits";
import { Settings } from "./menus/Settings";

import { Navigation } from "../Navigation/index";
import { useSelector } from "react-redux";

import Quest from "../Quest";
import style from "./Main.module.scss";



const Main = () => {
  const data = useSelector((state) => state.data.data);
  const HUE = data.settings.visual.HUE;

  function frameRedrawing() {
    switch (data.menu.name) {
      case "hire":
        return <Hire />;
      case "connect":
        return <Connect />;
      case "credits":
        return <Credits />;
      case "settings":
        return <Settings />;
      default:
        return "";
    }
  }

  const transitionStyle = () => {
    switch (data.menu.style) {
      case 1:
        return style.right;
      case 2:
        return style.back;
      default:
        return "";
    }
  };



  return (
    <section style={{ "--deg": HUE + "deg" }} className={style.body}>
      <div className="light"></div>
      <main className={transitionStyle()}>
        <div className={frameRedrawing() ? style.block : ""}></div>
        <Header />
        <section className={style.main}>
          <Profile />
          <section className={style.display}>
            <div className={style.leftTop}></div>
            <div className={style.leftBottom}></div>
            <div className={style.rightTop}></div>
            <div className={style.rightBottom}></div>
            <Outlet />
            <Navigation />
          </section>
          <Quest />
        </section>
      </main>

      {frameRedrawing()}
    </section>
  );
};

export default Main;
