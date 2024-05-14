import { useEffect, useRef, useState } from "react";
import { SnakeDirection } from "../interfaces/snake";
import { useGame } from "../context/GameContext";
import { LocalStorage } from "../utils/helper";
import { getBreakpoint, getCanvasWidth } from "../utils/screenSize";

let snakeDirection: SnakeDirection = "right";

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isGameRunning = useRef(false);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [canvasWidth, setCanvasWidth] = useState(() => {
    return getCanvasWidth(getBreakpoint());
  });

  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(getCanvasWidth(getBreakpoint()));
    };
    console.log("width :- ", canvasWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let {
    gameStatus,
    setGameStatus,
    gameScore,
    setGameScore,
    setHighScore,
    highScore,
  } = useGame();

  const CANVAS_WIDTH = canvasWidth;
  const CANVAS_HEIGHT = canvasWidth;
  console.log("width", window.innerWidth);

  const cellSize = CANVAS_WIDTH / 20;

  let snakeSize = cellSize;

  let snake = [
    { x: 0, y: 0 },
    { x: snakeSize, y: snakeSize },
    { x: snakeSize * 2, y: snakeSize },
    { x: snakeSize * 3, y: snakeSize },
  ];

  let food = {
    x: Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize,
    y: Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize,
  };

  const drawGrid = () => {
    if (!ctx) return;

    for (let i = 0; i < CANVAS_HEIGHT / cellSize; i++) {
      for (let j = 0; j < CANVAS_WIDTH / cellSize; j++) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  };

  let temp = 0;
  let speed = 0.1;

  const animate = () => {
    if (!ctx || !isGameRunning.current) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawGrid();

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);

    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "orange" : "green";
      ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });

    if (temp % (40 * speed) === 0) {
      const snakeHead = { ...snake[0] };

      switch (snakeDirection) {
        case "left":
          snakeHead.x -= snakeSize;
          break;
        case "right":
          snakeHead.x += snakeSize;
          break;
        case "up":
          snakeHead.y -= snakeSize;
          break;
        case "down":
          snakeHead.y += snakeSize;
          break;
        default:
          break;
      }

      snake.unshift(snakeHead);
      snake.pop();

      checkFoodCollison();
      checkSnakeCollison();
    }

    temp += 1;
    requestAnimationFrame(animate);
  };

  const growSnake = () => {
    const snakeTail = { ...snake[snake.length - 1] };
    snake.push(snakeTail);
  };

  const checkFoodCollison = () => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      food.x =
        Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize;
      food.y =
        Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize;

      gameScore += 5;
      setGameScore(gameScore);

      growSnake();
    }
  };

  const checkSnakeCollison = () => {
    const snakeHead = { ...snake[0] };

    if (
      snakeHead.x === CANVAS_WIDTH ||
      snakeHead.x < 0 ||
      snakeHead.y === CANVAS_HEIGHT ||
      snakeHead.y < 0
    ) {
      return gameOver();
    }
    snake.forEach((segment, index) => {
      if (index && segment.x === snakeHead.x && segment.y === snakeHead.y) {
        gameOver();
      }
    });
  };

  const gameOver = () => {
    if (gameScore > highScore) {
      setHighScore(gameScore);
      LocalStorage.set("snakeHighScore", gameScore);
    }

    setGameStatus("over");
    isGameRunning.current = false;
  };

  const handleUserKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        if (snakeDirection !== "right") snakeDirection = "left";
        break;
      case "ArrowRight":
        if (snakeDirection !== "left") snakeDirection = "right";
        break;
      case "ArrowUp":
        if (snakeDirection !== "down") snakeDirection = "up";
        break;
      case "ArrowDown":
        if (snakeDirection !== "up") snakeDirection = "down";
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let ctx = canvasRef.current?.getContext("2d");
    ctx && setCtx(ctx);

    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameStatus === "running" && !isGameRunning.current && ctx) {
      snakeDirection = "right";
      isGameRunning.current = true;
      setGameScore(0);
      animate();
    }
  }, [gameStatus, ctx, isGameRunning]);

  // handle user touches
  const touchStart = {
    x: 0,
    y: 0,
  };
  const touchEnd = {
    x: 0,
    y: 0,
  };

  const userTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameStatus !== "running") return;
    touchStart.x = event.touches[0].clientX;
    touchStart.y = event.touches[0].clientY;
  };
  const userTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameStatus !== "running") return;
    touchEnd.x = event.touches[0].clientX;
    touchEnd.y = event.touches[0].clientY;
  };
  const userTouchEnd = () => {
    if (gameStatus !== "running") return;
    if (
      Math.abs(touchStart.x - touchEnd.x) > Math.abs(touchStart.y - touchEnd.y)
    ) {
      if (snakeDirection === "left" || snakeDirection === "right") return;
      snakeDirection = touchStart.x > touchEnd.x ? "left" : "right";
    } else {
      if (snakeDirection === "up" || snakeDirection === "down") return;
      snakeDirection = touchStart.y > touchEnd.y ? "up" : "down";
    }
  };

  return (
    <canvas
      onTouchStart={userTouchStart}
      onTouchMove={userTouchMove}
      onTouchEnd={userTouchEnd}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="h-full w-full border border-white"
      ref={canvasRef}
    >
      yes
    </canvas>
  );
};

export default GameBoard;
