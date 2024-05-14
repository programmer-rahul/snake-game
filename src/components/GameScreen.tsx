import { Link } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import GameResult from "./GameResult";
import { useEffect, useState } from "react";
import GameStartTimer from "./GameStartTimer";
import { useGame } from "../context/GameContext";

const GameScreen = () => {
  const { gameStatus, setGameStatus, gameScore, highScore } = useGame();
  let [timerCount, setTimerCount] = useState(3);

  useEffect(() => {
    if (gameStatus === "not started") {
      setTimeout(() => {
        timerCount--;
        setTimerCount(timerCount);
        !timerCount && setGameStatus("running");
      }, 1000);
    }
    if (gameStatus !== "not started" && !timerCount) {
      setTimerCount(3);
    }
  }, [timerCount, gameStatus]);

  return (
    <div className="gamescreen">
      <div className="flex max-h-screen min-h-screen w-full flex-col border-2 border-red-500 bg-slate-900 lg:flex-row lg:justify-around">
        <Link to="/">
          <svg
            width="50px"
            height="100px"
            className="-my-2 mx-6 rotate-90 scale-75 rounded-md bg-slate-200 md:mx-8 md:scale-100 lg:mx-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6V18M12 18L7 13M12 18L17 13"
              stroke="rgb(37 99 235)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div
          className={`flex h-[300px] w-[300px] flex-col gap-4 self-center border-2 border-purple-900 md:h-[700px] md:w-[700px] lg:my-20 lg:h-[800px] lg:w-[800px] lg:self-start`}
        >
          <GameBoard />
        </div>
        <div className="mt-4 flex w-[300px] justify-between self-center text-white md:w-[700px] lg:my-20 lg:w-auto lg:flex-col lg:self-start lg:text-2xl">
          <div className="score lg:flex lg:gap-2">
            <p className="lg:flex">
              <span>Score</span>
              <span className="hidden lg:block"> :</span>
            </p>
            <span>{gameScore}</span>
          </div>
          <div className="high-score score lg:flex lg:gap-2">
            <p className="lg:flex">
              <span>HighScore</span>
              <span className="hidden lg:block"> :</span>
            </p>
            <span>{highScore}</span>
          </div>
        </div>
        {timerCount > 0 && gameStatus !== "running" && (
          <GameStartTimer timerTime={timerCount} />
        )}
        {gameStatus === "over" && <GameResult />}
      </div>
    </div>
  );
};
export default GameScreen;
