import { useEffect, useState } from "react";
import style from "./Snake.module.scss";
import { useHotkeys } from "react-hotkeys-hook";
import { useSelector, useDispatch } from "react-redux";
import { setAttemptsSnake, getCoin, setBestCoinsSnake, setBestSizeSnake } from "../../Redux/Slices/dataSlice";

function createElement(max, min, count) {
  let checkFood = [];
  //создание рандомных координат для еды

  checkFood = [...Array(count)].map(() => {
    const x = Math.floor(Math.random() * (max - min + 1)) + min;
    const y = Math.floor(Math.random() * (max - min + 1)) + min;

    return { x: x, y: y };
  })
  //возвращаем еду
  return checkFood;
}

function createFood(max, min, foods, id) {
  let checkFood = [];
  //создание рандомных координат для еды
  const x = Math.floor(Math.random() * (max - min + 1)) + min;
  const y = Math.floor(Math.random() * (max - min + 1)) + min;

  //перерендер определенного кусочка
  checkFood = foods.map((checkFood, checkId) => {
    return checkId != id ? { x: checkFood.x, y: checkFood.y } : { x: x, y: y };
  })
  //возвращаем еду
  return checkFood;
}

function createSnake(snake, direction) {
  const lose = [{ x: -10, y: -10 }, { x: -11, y: -10 }];
  //tempSnake - Создание новой змейки
  let tempSnake = [];
  //check - Проверка на столкновение
  let check = [];

  switch (direction) {
    case "UP":
      //Проверяем, будет ли столкновение с обьектам
      check = snake.filter((part) => part.x === snake[0].x && part.y === snake[0].y - 1);
      //В случае, если check имеет какой то обьект (Часть змеи, в которую мы столкнемся), то выкидываем змею за границу, для окончания игры
      tempSnake = check[0] ? lose :
        //в другом случае, создаем змейку
        [{ x: snake[0].x, y: snake[0].y - 1 }, ...snake];
      break;
    case "LEFT":
      check = snake.filter((part) => part.x === snake[0].x - 1 && part.y === snake[0].y);
      tempSnake = check[0] ? lose : [{ x: snake[0].x - 1, y: snake[0].y }, ...snake];
      break;
    case "RIGHT":
      check = snake.filter((part) => part.x === snake[0].x + 1 && part.y === snake[0].y);
      tempSnake = check[0] ? lose : [{ x: snake[0].x + 1, y: snake[0].y }, ...snake];
      break;
    case "DOWN":
      check = snake.filter((part) => part.x === snake[0].x && part.y === snake[0].y + 1);
      tempSnake = check[0] ? lose : [{ x: snake[0].x, y: snake[0].y + 1 }, ...snake];
      break;
  }

  //удаляем хвост змейки
  tempSnake.pop();

  //возвращаем итоговую змейку
  return tempSnake;
}

export const Snake = () => {
  const data = useSelector((state) => state.data.data)
  const dispatch = useDispatch();
  //game - Состояние игры. 
  const [game, setGame] = useState(false);
  //Направление змейки - UP LEFT RIGHT DOWN ты
  const [direction, setDirection] = useState("RIGHT");
  //Пока не используется, нужно для маленькой скорости игры - фикс бага
  const [cooldown, setcooldown] = useState(true);
  //Размер ячейки
  const size = 32;
  //скорость змейки
  const speed = 125;
  //длина змейки
  const [snakeSize, setSnakeSize] = useState(1);
  //получено монет
  const [coins, setCoins] = useState(0);
  //Сама змейка
  const [snake, setSnake] = useState(createElement(24, 0, 1));
  //Еда змейки
  const [foods, setFood] = useState(createElement(24, 0, 10));


  //Если змейка выйдет за игровое поле, то игра остановится, проверка по всем сторонам
  if (snake[0].x >= 0 &&
    snake[0].x < 25 &&
    snake[0].y >= 0 &&
    snake[0].y < 25) {
    //Хороший исход, игрок в игровом поле
  } else {
    //Игрок вышел за поле и или врезался в себя
    //Сохраняем деньги
    dispatch(getCoin({ state: false, coins: coins }))
    //Проверяем на рекорд по деньгам
    coins > data.games.snake.best.bestCoins ? dispatch(setBestCoinsSnake(coins)) : "";
    //Проверяем на рекорд на размер
    snakeSize > data.games.snake.best.bestSize ? dispatch(setBestSizeSnake(snakeSize)) : "";
    //Обнуляем размер
    setSnakeSize(1)
    //Останавливаем игру
    setGame(false);
    //Ставим в начальнуюпозицию змейку
    setSnake(createElement(24, 0, 1))
    //обнуляем деньга
    setCoins(0)
  }


  //Пересоздание еды, в случае, если змея на ее координатах - ест
  foods.map((food, id) => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      snakeSize % 9 === 0 ?
        setCoins(coins + 100) : "";
      //Удлиняем змейку
      setSnake([...snake, { x: food.x, y: food.y, }])
      //изменяем размер
      setSnakeSize(snakeSize + 1)
      //Пересоздаем еду
      setFood(createFood(24, 0, foods, id));
    }
  })



  useEffect(() => {
    //Если игра TRUE - идет, то рендерим кадры
    if (game) {
      //рендер движения
      setSnake((el) => createSnake(el, direction))

      //Интервальное движение по направлению
      const interval = setInterval(() => {
        //setcooldown(true)

        //рендер движения
        setSnake((el) => createSnake(el, direction));
      }, speed)
      return () => clearInterval(interval)
    } else {
      //В другом случае, стопаем игру
      console.log("PAUSE");
    }

  }, [direction, game])


  //Следим за изменением движения
  useHotkeys("w, up", () => {
    //В будущем, блокировка- фикс бага, при низкой скорости
    if (cooldown) {
      //Блокируем на время
      // setcooldown(false);
      setDirection("UP")
    } else {
      //Сообщаем о блокировке
      console.log("- UP");
    }
  });
  useHotkeys("a, left", () => {
    if (cooldown) {
      // setcooldown(false);
      setDirection("LEFT")
    } else {
      console.log("- LEFT");
    }
  });
  useHotkeys("d, right", () => {
    if (cooldown) {
      //   setcooldown(false);
      setDirection("RIGHT")
    } else {
      console.log("- RIGHT");
    }
  });
  useHotkeys("s, down", () => {
    if (cooldown) {
      //  setcooldown(false);
      setDirection("DOWN")
    } else {
      console.log("- DOWN");
    }

    //Enter = Завершить игру \ начать игру
  });
  useHotkeys("enter", () => {
    console.log("enter");
    if (game) {
      //Выкидываем из игрового поля, чтобы завершить игру
      setSnake([{ x: -10, y: -10 }, { x: -11, y: -10 }])
      //сохраняем деньга
      dispatch(getCoin({ state: false, coins: coins }))
      //СОхранение рекорда по деньга
      coins > data.games.snake.best.bestCoins ? dispatch(setBestCoinsSnake(coins)) : "";
      //Сохранение рекорда по размеру чиньчика
      snakeSize > data.games.snake.best.bestSize ? dispatch(setBestSizeSnake(snakeSize)) : "";
      //обнуляем деньга
      setCoins(0)
    } else {
      //Добавляем попытку при старте
      dispatch(setAttemptsSnake());
    }

    setGame(!game);
  })


  return (
    <section className={style.Snake}>
      <div className={style.panel}>
        <div className={style.panelTextBox}>
          <p className={style.panelMain}>Your name:</p>
          <p className={style.panelMedium}>{data.login}</p>
        </div>

        <div className={style.panelTextBox}>
          <p className={style.panelMain}>Best coins</p>
          <p className={style.panelLow}>{data.games.snake.best.bestCoins} <span>Coins</span></p>
        </div>

        <div className={style.panelTextBox}>
          <p className={style.panelMain}>attempts:</p>
          <p className={style.panelLow}>{data.games.snake.attempts} <span>times</span></p>
        </div>


        <div className={style.panelTextBox}>
          <p className={style.panelMain}>best size snake:</p>
          <p className={style.panelLow}>{data.games.snake.best.bestSize} / 625 <span>cells</span></p>
        </div>

        <div className={style.panelTextBox}>
          <p className={style.panelMain}>Game:</p>
          <p className={style.panelLow}><span>status</span> {game ? "PLAY" : "STOP"}</p>
        </div>


        <div className={style.panelTextBox}>
          <p className={style.panelMain}>direction:</p>
          <p className={style.panelMedium}>{direction}</p>
        </div>

        <div className={style.panelTextBox}>
          <p className={style.panelMain}>speed:</p>
          <p className={style.panelMedium}>{speed}</p>
        </div>

        <div className={style.panelTextBox}>
          <p className={style.panelMain}>Snake Size:</p>
          <p className={style.panelMedium}>{snakeSize}</p>
        </div>

        <div className={style.panelTextBox}>
          <p className={style.panelMain}>Coins:</p>
          <p className={style.panelMedium}>{coins}</p>
        </div>

        <div className={style.panelTextBox}>
          <p className={style.panelMain}>Count food:</p>
          <p className={style.panelMedium}>{foods.length}</p>
        </div>

        <div className={style.panelDesc}>
          <h1>Controls</h1>
          <p><span>W</span> - UP</p>
          <p><span>a</span> - left</p>
          <p><span>s</span> - down</p>
          <p><span>d</span> - right</p>
          <p><span>enter</span> - stop / start</p>
          <p className={style.panelDescPlus}><span>Name</span> - The name is substituted depending on which one you specified when sending Hire / Contact! If it's not there, send a message!</p>
        </div>

        <div className={style.leftTop}></div>
        <div className={style.leftBottom}></div>
        <div className={style.rightTop}></div>
        <div className={style.rightBottom}></div>
      </div>
      <div className={style.screen}>
        <div className={style.leftTop}></div>
        <div className={style.rightTop}></div>

        {foods.map((food, id) => (
          <div
            key={id}
            style={{
              left: food.x * size + "px",
              top: food.y * size + "px",
            }}
            className={style.food}
          ></div>
        ))}

        {snake.map((snake, id) => (
          <div
            key={id}
            style={{
              left: snake.x * size + "px",
              top: snake.y * size + "px",
            }}
            className={id === 0 ? style.snakeHead : id % 2 ? style.snake2 : style.snake}
          ></div>
        ))}
      </div>
      <div className={style.panel}>
        <div className={style.leftTop}></div>
        <div className={style.leftBottom}></div>
        <div className={style.rightTop}></div>
        <div className={style.rightBottom}></div>
      </div>
    </section>
  );
};
