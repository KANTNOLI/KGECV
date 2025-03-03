import { Link } from "react-router-dom";
import style from "./Navigation.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../Redux/Slices/dataSlice";
import SoundSnippet from "../../Sound/SoundSnippet";

export const Navigation = () => {
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  const list = useSelector((state) => state.navigation.list);

  return (
    <nav>
      {list.map((page, id) => (
        <Link key={id} to={"/main/" + page}>
          <div
            onClick={() => {
              data.page.id != id || data.page.id === 4
                ? SoundSnippet({
                  style: 4,
                  crop: 0.1,
                  settings: data.settings,
                })
                : "";

              dispatch(setPage({ name: page, id: id }));
            }}
            className={
              data.page.id === id ? style.pageActive : style.pageInactive
            }
          >
            <p className={style.title}>{page}</p>
            <p className={style.desc}>
              Suscipit est consequatur <br /> nemo voluptatem est <br />
              labore saepe.
            </p>
          </div>
        </Link>
      ))}
    </nav>
  );
};
