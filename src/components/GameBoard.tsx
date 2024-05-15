import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import { SnakeDirection } from "../interfaces/snake";
import { LocalStorage } from "../utils/helper";

let snakeDirection: SnakeDirection = "right";

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isGameRunning = useRef(false);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(300);

  let {
    gameStatus,
    setGameStatus,
    gameScore,
    setGameScore,
    setHighScore,
    highScore,
  } = useGame();

  const gridSize = 20;
  const cellSize = canvasWidth / gridSize;

  let snake = [{ x: 0, y: 0 }];
  let food = { x: 0, y: 0 };
  let snakeSize = cellSize;

  const drawGrid = () => {
    if (!ctx) return;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        ctx.strokeStyle = "red";
        ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  };

  let frame = 0;
  let speed = 1;

  const animate = () => {
    if (!ctx || !isGameRunning.current) return;

    ctx.clearRect(0, 0, canvasWidth, canvasWidth);
    drawGrid();

    // to draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);

    // to draw snake head and tails
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "orange" : "green";
      ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });

    if (frame % (12 - speed) === 0) {
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

      console.log("frame :- ", frame);
      console.log("speed :- ", speed);

      snake.unshift(snakeHead);
      snake.pop();

      checkSnakeCollison();
      checkFoodCollison();
    }

    frame += 1;
    requestAnimationFrame(animate);
    console.log("animate running", speed);
  };

  const checkFoodCollison = () => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      generateSnakeFood();

      gameScore += 5;
      setGameScore(gameScore);

      growSnake();
    }
  };

  const generateSnakeFood = () => {
    food.x = Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize;
    food.y = Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize;

    console.log("f", food);
  };

  const growSnake = () => {
    const snakeTail = { ...snake[snake.length - 1] };
    snake.push(snakeTail);
    if (speed <= 6) speed += 1;
  };

  const checkSnakeCollison = () => {
    const snakeHead = { ...snake[0] };

    if (
      snakeHead.x === canvasWidth ||
      snakeHead.x < 0 ||
      snakeHead.y === canvasWidth ||
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
    if (canvasRef) {
      let ctx = canvasRef.current?.getContext("2d");
      ctx && setCtx(ctx);

      if (canvasRef.current) {
        let calculatedWidth;
        if (window.innerWidth < window.innerHeight - 100) {
          calculatedWidth = window.innerWidth - (window.innerWidth % 10) - 30;
          canvasRef.current.width = calculatedWidth;
          canvasRef.current.height = calculatedWidth;
        } else {
          calculatedWidth =
            window.innerHeight - (window.innerHeight % 10) - 200;
          canvasRef.current.width = calculatedWidth;
          canvasRef.current.height = calculatedWidth;
        }
        setCanvasWidth(calculatedWidth);
      }
    }

    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameStatus === "running" && !isGameRunning.current && ctx) {
      snakeDirection = "right";
      isGameRunning.current = true;
      setGameScore(0);

      generateSnakeFood();
      snake.push({ x: snakeSize * 2, y: 0 });
      snake.push({ x: snakeSize * 3, y: 0 });
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
    <div className="flex h-full w-full justify-center">
      <canvas
        onTouchStart={userTouchStart}
        onTouchMove={userTouchMove}
        onTouchEnd={userTouchEnd}
        ref={canvasRef}
        className="h-full w-auto self-center border-2 border-red-500"
        width={cellSize * gridSize}
        height={cellSize * gridSize}
      ></canvas>
    </div>
  );
};
export default GameBoard;
