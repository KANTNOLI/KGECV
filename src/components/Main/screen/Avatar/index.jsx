import style from './Avatar.module.scss'

export const Avatar = () => {
    return (
        <main className={style.main}>

            <p className={style.tag}>
                Who is luz wintheiser
            </p>

            <section className={style.content}>
                <section className={style.sect1}>
                    <div className={style.page}>
                        <p className={style.pageTitle}>
                            The short introduction of my life
                        </p>
                        <p className={style.pageDesc}>
                            I have always been fascinated by the endless possibilities of the internet and the ways it can be leveraged to make our lives better. I decided to pursue a career in web engineering to help build innovative and impactful web-based solutions that can solve complex problems and make a difference in people's lives.
                        </p>
                    </div>

                    <div className={style.page}>
                        <p className={style.pageTitle}>
                            Career and development
                        </p>
                        <p className={style.pageDesc}>
                            Throughout my career, I have worked with a wide range of technologies, from front-end frameworks like React and Angular to back-end frameworks like Node.js and Django. I am passionate about staying up-to-date with the latest industry trends and tools and continually learning new skills to improve my craft.
                        </p>
                    </div>

                    <div className={style.page}>
                        <p className={style.pageTitle}>
                            More can be added in the left side for summary
                        </p>
                        <p className={style.pageDesc}>
                            As a web engineer, my top priority is to ensure the reliability, scalability, and security of the web applications I develop. I enjoy collaborating with cross-functional teams and working closely with clients to understand their needs and provide them with the best possible solutions.
                        </p>
                    </div>
                </section>

                <section className={style.sect2}>
                    <div className={style.leftTop}></div>
                    <div className={style.leftBottom}></div>
                    <div className={style.rightTop}></div>
                    <div className={style.rightBottom}></div>
                </section>
            </section>


        </main>
    )
}
