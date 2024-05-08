import { useEffect, useRef, useState } from "react";
import { SnakeDirection } from "../interfaces/snake";

let snakeDirection: SnakeDirection = "right";

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  let [gameScore, setGameScore] = useState(0);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  let gameStatus = true;

  let snakeSize = 40;

  let snake = [{ x: 0, y: 0 }];
  let food = {
    x: Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize,
    y: Math.floor(Math.random() * (CANVAS_WIDTH / snakeSize)) * snakeSize,
  };

  let temp = 0;
  const animate = () => {
    if (!ctx) return;

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
      console.log("snakeDirection", snakeDirection);

      checkFoodCollison();

      snake.unshift(snakeHead);
      snake.pop();
    }

    temp += 4;
    requestAnimationFrame(animate);
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

  const growSnake = () => {
    const snakeTail = { ...snake[snake.length - 1] };
    snake.push(snakeTail);
  };

  useEffect(() => {
    let ctx = canvasRef.current?.getContext("2d");
    ctx && setCtx(ctx);
    animate();
    // console.log(food);
  }, [ctx]);

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
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

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
          <span>{0}</span>
        </div>
      </div>
    </>
  );
};
export default GameBoard;
