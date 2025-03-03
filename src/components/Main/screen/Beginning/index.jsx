import style from "./Beginning.module.scss";

export const Beginning = () => {
  return (
    <section className={style.beginning}>
      <div className={style.BegDescription}>
        <p className={style.title}>
          swimming through a vast network of interconnected devices and servers,
          spreading joy and whimsy to users across the globe
        </p>
        <p className={style.description}>Artwork generated with midjourney</p>

      </div>
    </section>
  );
};
