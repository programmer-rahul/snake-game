import { useEffect, useRef, useState } from "react";
import { SnakeDirection } from "../interfaces/snake";
import { useGame } from "../context/GameContext";

let snakeDirection: SnakeDirection = "right";

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isGameRunning = useRef(false);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  let {
    gameStatus,
    setGameStatus,
    gameScore,
    setGameScore,
    setHighScore,
    highScore,
  } = useGame();

  const CANVAS_WIDTH = 360;
  const CANVAS_HEIGHT = 360;

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

  let temp = 0;

  const drawGrid = () => {
    if (!ctx) return;

    for (let i = 0; i < CANVAS_HEIGHT / cellSize; i++) {
      for (let j = 0; j < CANVAS_WIDTH / cellSize; j++) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  };

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

    if (temp % snakeSize === 0) {
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

    temp += 4;
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
    if (gameScore > highScore) setHighScore(gameScore);

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
      animate();
    }
  }, [gameStatus, ctx, isGameRunning]);

  return (
    <>
      <div className={`gameboard xl:w-full xl:h-full mx-auto my-10 xl:m-0`}>
        <canvas
          className="border-2 border-purple-600"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={canvasRef}
        ></canvas>
      </div>
      <div className="flex justify-between text-white px-8 xl:px-0">
        <div className="score">
          <p>Score</p>
          <span>{gameScore}</span>
        </div>
        <div className="high-score">
          <p>High Score</p>
          <span>{highScore}</span>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
