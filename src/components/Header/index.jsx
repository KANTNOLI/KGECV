import style from "./Header.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setMenu, getCoin } from "../../Redux/Slices/dataSlice";
import { useEffect, useState } from "react";
import SoundSnippet from "../../Sound/SoundSnippet";

function timeСonversion(hours, minutes) {
  let time = "";
  time += hours < 10 ? `0${hours}:` : `${hours}:`;
  time += minutes < 10 ? `0${minutes}` : `${minutes}`;
  return time;
}

const Header = () => {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  let dates = new Date();
  const [userTime, setUserTime] = useState();
  const [localTime, setLocalTime] = useState();

  useEffect(() => {
    setUserTime(timeСonversion(dates.getHours() % 24, dates.getMinutes()));
    setLocalTime(
      timeСonversion((dates.getUTCHours() + 3) % 24, dates.getMinutes())
    );

    setInterval(() => {
      dates = new Date();
      setUserTime(timeСonversion(dates.getUTCHours() % 24, dates.getMinutes())),
        setLocalTime(
          timeСonversion((dates.getUTCHours() + 3) % 24, dates.getMinutes())
        );
    }, 15000);
  }, [userTime, localTime]);

  return (
    <header className={style.header}>
      <section className={style.left}>
        <div>
          <p>
            <span>{data.lvl}</span> LEVEL
          </p>
        </div>

        <div className={style.coins}>
          <button
            onClick={() => {
              SoundSnippet({
                style: 0,
                crop: 0.2,
                settings: data.settings,
              });
              dispatch(getCoin({state: true}));
            }}
            className={style.button}
          >
            +
          </button>
          <p>
            <span>{data.coins}</span> COINS AWARDED{" "}
          </p>
        </div>
      </section>

      <section className={style.right}>
        <button
          onClick={() => {
            SoundSnippet({
              style: 2,
              crop: 0.91,
              settings: data.settings,
            });
            dispatch(setMenu({ name: "credits", style: 1 }));
          }}
          className={style.credits}
        >
          credits
        </button>
        <div>
          <p>
            DEVELOPER time:
            <span>
              <time> {localTime}</time>
            </span>
          </p>
        </div>
        <div>
          <p>
            local time:
            <span>
              <time> {userTime}</time>
            </span>
          </p>
        </div>
      </section>
    </header>
  );
};

export default Header;
