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

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  let snakeSize = 40;

  let snake = [
    { x: 0, y: 0 },
    { x: snakeSize * 1, y: snakeSize * 1 },
    { x: snakeSize * 2, y: snakeSize * 1 },
    { x: snakeSize * 3, y: snakeSize * 1 },
  ];

  let food = {
    x: Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize,
    y: Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize,
  };

  let temp = 0;

  const animate = () => {
    console.log("inside animate func", snakeDirection);
    if (!ctx || !isGameRunning.current) return;
    console.log("animate");

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);

    // snake
    snake.forEach((segment) => {
      ctx.fillStyle = "orange";
      ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });

    if (temp % snakeSize === 0) {
      const snakeHead = { ...snake[0] };

      if (snakeDirection === "left") snakeHead.x -= snakeSize;
      if (snakeDirection === "right") snakeHead.x += snakeSize;
      if (snakeDirection === "up") snakeHead.y -= snakeSize;
      if (snakeDirection === "down") snakeHead.y += snakeSize;

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
      if (segment.x === snakeHead.x && segment.y === snakeHead.y && index) {
        gameOver();
      }
    });
  };

  const gameOver = () => {
    gameScore && setGameScore(0);
    if (gameScore > highScore) setHighScore(gameScore);

    setGameStatus("over");
    isGameRunning.current = false;
  };

  const handleUserKeyPress = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft" && snakeDirection !== "right")
      snakeDirection = "left";
    if (event.key === "ArrowRight" && snakeDirection !== "left")
      snakeDirection = "right";
    if (event.key === "ArrowUp" && snakeDirection !== "down")
      snakeDirection = "up";
    if (event.key === "ArrowDown" && snakeDirection !== "up")
      snakeDirection = "down";
    // console.log("key", event.key);
    // console.log("snakeDirection", snakeDirection);
  };

  useEffect(() => {
    let ctx = canvasRef.current?.getContext("2d");
    ctx && setCtx(ctx);
    snakeDirection = "right";

    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameStatus === "running" && !isGameRunning.current && ctx) {
      isGameRunning.current = true;
      animate();
    }
  }, [gameStatus, ctx, isGameRunning]);

  return (
    <>
      <div className="gameboard w-full h-full">
        <canvas
          className="border-2 border-purple-600"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={canvasRef}
        ></canvas>
      </div>
      <div className="flex justify-between text-white">
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
