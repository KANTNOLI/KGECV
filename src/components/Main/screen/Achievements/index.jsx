import { useState } from "react";
import { useSelector } from "react-redux";
import SoundSnippet from "../../../../Sound/SoundSnippet";
import style from "./Achievements.module.scss";

export const Achievements = () => {
  //Настройки
  const data = useSelector((state) => state.data.data);
  const HUE = 360 - data.settings.visual.HUE;

  //Фильтрация
  const titles = useSelector((state) => state.filter.titles);
  const [filters, setFilters] = useState(3);

  //Создание ачивок
  const achievementsList = useSelector((state) => state.achievements.list);
  const colors = useSelector((state) => state.achievements.colors);
  const [achievements, setAchievements] = useState(achievementsList);

  //Функция для рендера по фильтру
  const rerenderFilter = (id) => {
    //Переменная для удобства + масштабирования фильтрации
    let filtering = achievementsList;
    setFilters(id);
    if (id == 0) {
      filtering = achievementsList.filter((achievement) => achievement.ready);
    } else if (id == 1) {
      filtering = achievementsList.filter(
        (achievement) => achievement.progress
      );
    } else if (id == 2) {
      filtering = achievementsList.filter((achievement) => !achievement.ready);
    }

    //Сохранение данных после фильтра
    setAchievements(filtering);
  };

  return (
    <section className={style.achievements}>
      <p className={style.achievementsTitle}>achievements</p>

      <div className={style.filter}>
        <p className={style.filterTitle}>Filter:</p>

        {titles.map((title, id) => (
          <div key={id} className={style.filterDiv}>
            {
              <input
                name="radio"
                onClick={() =>
                  data.settings.sounds
                    ? SoundSnippet({
                        style: 5,
                        crop: 0.39,
                        settings: data.settings,
                      })
                    : ""
                }
                onChange={() => rerenderFilter(id)}
                type="radio"
              />
            }

            <p
              className={
                filters === id ? style.filterActive : style.filterInactive
              }
            >
              {title}
            </p>
          </div>
        ))}
      </div>

      <div style={{ "--deg": HUE + "deg" }} className={style.content}>
        {achievements &&
          achievements.map((achievement, id) => (
            <div
              key={id}
              className={
                achievement.ready
                  ? style.achievementActive
                  : style.achievementInactive
              }
              style={{
                "--achievementColor": colors[achievement.rarity],
              }}
            >
              <div className={style.achFrame}>
                <img
                  style={{ "--deg": HUE + "deg" }}
                  src={achievement.img}
                  alt=""
                />
                <p>{achievement.rarity}</p>
              </div>
              <p>{achievement.description}</p>
            </div>
          ))}

        <div className={style.achievement}></div>
      </div>
    </section>
  );
};
