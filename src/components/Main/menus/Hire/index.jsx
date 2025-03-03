import { useEffect, useState } from "react";
import style from "./Hire.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadEmail, setMenu } from "../../../../Redux/Slices/dataSlice";
import SoundSnippet from "../../../../Sound/SoundSnippet";

export const Hire = () => {
  const [active, setActive] = useState(false);
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  setTimeout(() => {
    setActive(true);
  }, 10);

  const [name, setName] = useState("");
  const handleChangeName = (event) => {
    SoundSnippet({
      style: 1,
      crop: 0.2,
      settings: data.settings,
    });
    setName(event.target.value);
  };

  const [email, setEmail] = useState("");
  const handleChangeEmail = (event) => {
    SoundSnippet({
      style: 1,
      crop: 0.2,
      settings: data.settings,
    });
    setEmail(event.target.value);
  };

  const [desc, setDesc] = useState("");
  const handleChangeDesc = (event) => {
    SoundSnippet({
      style: 1,
      crop: 0.2,
      settings: data.settings,
    });
    setDesc(event.target.value);
  };

  //Загрузка данных
  useEffect(() => {
    setName(data.login);
    setEmail(data.email);
  }, []);

  return (
    <section className={active ? style.menuActive : style.menuInactive}>
      <p className={style.title}>I would love to hear about your projects!</p>
      <div className={style.panel}>
        <div className={style.corner}></div>

        <div className={style.input}>
          <p>How should I call you?</p>
          <input
            value={name}
            onChange={handleChangeName}
            type="text"
            placeholder="your name"
          />
        </div>

        <div className={style.input}>
          <p>Sending from</p>
          <input
            value={email}
            onChange={handleChangeEmail}
            type="email"
            placeholder="your.name@acme.com"
          />
        </div>

        <div className={style.input}>
          <p>transmitted data</p>
          <textarea
            value={desc}
            onChange={handleChangeDesc}
            type="text"
            placeholder="Hi, I write to you about ..."
          />
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
            dispatch(loadEmail({ login: name, email: email }));
          }}
          className={style.send}
        >
          send message [enter]
        </button>

        <button
          onClick={() => {
            SoundSnippet({
              style: 1,
              crop: 0,
              settings: data.settings,
            });
            dispatch(setMenu(""));
          }}
          className={style.discard}
        >
          discard [esc]
        </button>
      </div>
    </section>
  );
};
