import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import style from "./Creations.module.scss";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import SoundSnippet from "../../../../Sound/SoundSnippet";

export const Creations = () => {
  const data = useSelector((state) => state.data.data);
  const HUE = 360 - data.settings.visual.HUE;

  return (
    <section className={style.creations}>
      <p className={style.creationsTitle}>Creations</p>
      <Swiper
        spaceBetween={-10}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={"swiper-slide-duplicate-prev"}
        coverflowEffect={{
          rotate: -20,
          stretch: 150,
          depth: 300,
          modifier: 2.2,
          slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={"mySwiper " + style.swap}
      >
        <SwiperSlide>
          <div className={style.slide}>
            <div className={style.screen}>
              <img
                src="https://avatars.mds.yandex.net/i?id=b5a0cd3a246aa496b9811fa1ea9c229723c67327-9303200-images-thumbs&n=13"
                alt=""
              />
              <div className={style.back}></div>
              <div className={style.leftTop}></div>
              <div className={style.leftBottom}></div>
              <div className={style.rightTop}></div>
              <div className={style.rightBottom}></div>
              <p>published 3 months ago</p>
              <div className={style.preview}>
                <img
                  style={{ "--deg": HUE + "deg" }}
                  src="https://avatars.mds.yandex.net/i?id=b5a0cd3a246aa496b9811fa1ea9c229723c67327-9303200-images-thumbs&n=13"
                  alt=""
                />
              </div>
              <button
                onClick={() => {
                  SoundSnippet({
                    style: 1,
                    crop: 0.2,
                    settings: data.settings,
                  });
                }}
              >
                view live
              </button>
            </div>

            <p className={style.slideTitle}>
              The project name...........................................
              <br />
              <span>react website</span>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ "--deg": HUE + "deg" }} className={style.slide}>
            <div className={style.screen}>
              <img
                style={{ "--deg": HUE + "deg" }}
                src="https://luxe-host.ru/wp-content/uploads/c/2/f/c2f99fe92c2786c315021e10ad7c3d99.png"
                alt=""
              />
              <div className={style.back}></div>
              <div className={style.leftTop}></div>
              <div className={style.leftBottom}></div>
              <div className={style.rightTop}></div>
              <div className={style.rightBottom}></div>
              <p>published 3 months ago</p>
              <div className={style.preview}>
                <img
                  style={{ "--deg": HUE + "deg" }}
                  src="https://luxe-host.ru/wp-content/uploads/c/2/f/c2f99fe92c2786c315021e10ad7c3d99.png"
                  alt=""
                />
              </div>
              <button
                onClick={() => {
                  SoundSnippet({
                    style: 1,
                    crop: 0.2,
                    settings: data.settings,
                  });
                }}
              >
                view live
              </button>
            </div>

            <p className={style.slideTitle}>
              The project name...........................................
              <br />
              <span>react website</span>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ "--deg": HUE + "deg" }} className={style.slide}>
            <div className={style.screen}>
              <img
                style={{ "--deg": HUE + "deg" }}
                src="https://mir-s3-cdn-cf.behance.net/projects/original/6df07b81274525.Y3JvcCwxNDQ4LDExMzMsMTI1LDA.jpg"
                alt=""
              />
              <div className={style.back}></div>
              <div className={style.leftTop}></div>
              <div className={style.leftBottom}></div>
              <div className={style.rightTop}></div>
              <div className={style.rightBottom}></div>
              <p>published 3 months ago</p>
              <div className={style.preview}>
                <img
                  style={{ "--deg": HUE + "deg" }}
                  src="https://mir-s3-cdn-cf.behance.net/projects/original/6df07b81274525.Y3JvcCwxNDQ4LDExMzMsMTI1LDA.jpg"
                  alt=""
                />
              </div>
              <button
                onClick={() => {
                  SoundSnippet({
                    style: 1,
                    crop: 0.2,
                    settings: data.settings,
                  });
                }}
              >
                view live
              </button>
            </div>

            <p className={style.slideTitle}>
              The project name...........................................
              <br />
              <span>react website</span>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <p className={style.creationsDesc}>
        Build this website. Implement a full react website with multiple
        routers, UI elements and tricky styling. Make it all work great!
      </p>
      <div className={style.creationsIcon}></div>
    </section>
  );
};
