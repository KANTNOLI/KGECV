import { useEffect, useRef, useState } from "react";
import style from "./JapaneseSimulator.module.scss"
import { useHotkeys } from "react-hotkeys-hook";
import { useSelector, useDispatch } from "react-redux";
import { getCoin, setAttemptsJapanese, setBestExampleJapanese, setBestTimeJapanese } from "../../Redux/Slices/dataSlice";

function border() {

    return (<>
        <div className={style.leftTop}></div>
        <div className={style.leftBottom}></div>
        <div className={style.rightTop}></div>
        <div className={style.rightBottom}></div>
    </>)
}

function examples() {
    const max = 9;
    const min = 0;

    let symbol = Math.floor(Math.random() * (1 - 0 + 1)) + 0
    let first = Math.floor(Math.random() * (max - min + 1)) + min;
    let second = Math.floor(Math.random() * (max - min + 1)) + min;

    if (first < second && !symbol) {
        let temp = first;
        first = second;
        second = temp;
    }

    return {
        first: first,
        symbol: symbol,
        second: second,
        result: 0,
    }
}

function convertTime(second) {
    let hour = Math.floor(second / 3600) % 24;
    let min = Math.floor(second % 3600 / 60);
    let sec = Math.floor(second % 3600 % 60);

    hour = hour < 10 ? `0${hour}` : `${hour}`;
    min = min < 10 ? `0${min}` : `${min}`;
    sec = sec < 10 ? `0${sec}` : `${sec}`;

    return `${hour}:${min}:${sec}`
}

export const JapaneseSimulator = () => {
    const data = useSelector((state) => state.data.data)
    const dispatch = useDispatch();

    //Колво строчек
    const rowtTotal = 13;
    //Массив готовых примеров
    const [readyExamples, setReadyExamples] = useState([{
        first: 1,
        symbol: 0,
        second: 1,
        result: 0,
    }])
    //Создание примера
    const [example, setExample] = useState(examples())
    //время
    const [startTime, setStartTime] = useState(false);
    const [time, setTime] = useState(0);

    const [counterEx, setCounterEx] = useState(0)

    //Отслеживание ввода
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        if (event.target.value === "-1") {

            counterEx > data.games.JapaneseSimulator.best.example ?
                dispatch(setBestExampleJapanese(counterEx)) : "";
            time > data.games.JapaneseSimulator.best.time ?
                dispatch(setBestTimeJapanese(time)) : "";

            setCounterEx(0)
            setTime(0)
            setStartTime(false)
            setValue("")
        }
        let result = -1;

        //в зависимости от + или -, смотрим результат
        if (example.symbol) {
            result = example.first +
                example.second
        } else {
            result = example.first -
                example.second
        }

        //сравнение ввода и результата
        if (event.target.value == result) {
            setReadyExamples([...readyExamples, {
                first: example.first,
                symbol: example.symbol,
                second: example.second,
                result: result,
            }])
            counterEx % 9 === 0 && counterEx != 0 ?
                dispatch(getCoin({ state: false, coins: 100 })) :
                "";
            setExample(examples())
            setCounterEx(counterEx + 1)

            setValue("")
        } else {
            setValue(event.target.value)
        }

    };



    useEffect(() => {
        if (startTime) {
            dispatch(setAttemptsJapanese());
            let a = setInterval(() => {
                setTime((time) => time + 1)
            }, 1000)

            return () => clearInterval(a);
        }

    }, [startTime])

    useHotkeys("enter", () => {
        console.log("enter");
        setTime(0)
        setStartTime(false)
    })

    return (
        <section className={style.JapaneseSimulator}>
            <div className={style.panel}>
                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>Your name:</p>
                    <p className={style.panelMedium}>{data.login}</p>
                </div>

                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>Long play time</p>
                    <p className={style.panelLow}>{convertTime(data.games.JapaneseSimulator.best.time)} <span>sec</span></p>
                </div>

                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>best ready example:</p>
                    <p className={style.panelMedium}>{data.games.JapaneseSimulator.best.example}</p>
                </div>
                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>attempts:</p>
                    <p className={style.panelLow}>{data.games.JapaneseSimulator.attempts}<span> times</span></p>
                </div>


                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>best E/T</p>
                    <p className={style.panelLow}>1.5</p>
                </div>

                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>Game:</p>
                    <p className={style.panelLow}><span>status</span> {startTime ? "PLAY" : "STOP"}</p>
                </div>

                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>Play Time</p>
                    <p className={style.panelLow}>{convertTime(time)} <span>sec</span></p>
                </div>

                <div className={style.panelTextBox}>
                    <p className={style.panelMain}>example ready</p>
                    <p className={style.panelMedium}>{counterEx}</p>
                </div>


                <div className={style.panelDesc}>
                    <h1>How to play?</h1>
                    <p className={style.panelDescPlus}><span>NAME</span> - THE NAME IS SUBSTITUTED DEPENDING ON WHICH ONE YOU SPECIFIED WHEN SENDING HIRE / CONTACT! IF IT'S NOT THERE, SEND A MESSAGE!</p>

                    <p className={style.panelDescPlus}><span>The beginning of the game</span> - To start the game, you need to start solving examples! When clicked, the timer will start!</p>

                    <p className={style.panelDescPlus}><span>Finish the game</span> - To complete the game, you need to write -1 in the answer or by clicking on any part of the screen to exit the answer mode, press ENTER</p>
                </div>

                <div className={style.leftTop}></div>
                <div className={style.leftBottom}></div>
                <div className={style.rightTop}></div>
                <div className={style.rightBottom}></div>
            </div>


            <div className={style.column}>
                {[...Array(readyExamples.length + 1)].map((_, id) =>
                (
                    readyExamples.length > rowtTotal - 1 ? setReadyExamples(readyExamples.filter((element, id) => id > rowtTotal - 2)) : "",
                    <div key={id} className={readyExamples[id] ? style.row : style.rowShow}>
                        <div className={style.cell}>{readyExamples[id] ? readyExamples[id].first : ""}</div>
                        <div className={style.cell}>{readyExamples[id] ? readyExamples[id].symbol ? "+" : "-" : ""}</div>
                        <div className={style.cell}>{readyExamples[id] ? readyExamples[id].second : ""}</div>
                        <div className={style.cell}>=</div>
                        <div className={style.cell}>{readyExamples[id] ? readyExamples[id].result : ""}</div>
                    </div>
                ))}

                <div className={style.row}>
                    <div className={style.cell}>{example.first}</div>
                    <div className={style.cell}>{example.symbol ? "+" : "-"}</div>
                    <div className={style.cell}>{example.second}</div>
                    <div className={style.cell}>=</div>
                    <input onClick={() => setStartTime(true)} type="number" className={style.cell} value={value} onChange={(event) => handleChange(event)} />
                </div>
            </div>

            <div className={style.panel} >
                {border()}
            </div>

        </section >
    )
}
