import { Link } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import GameResult from "./GameResult";
import { useEffect, useState } from "react";
import GameStartTimer from "./GameStartTimer";
import { useGame } from "../context/GameContext";

const GameScreen = () => {
  const { gameStatus, setGameStatus } = useGame();
  let [timerCount, setTimerCount] = useState(3);

  useEffect(() => {
    console.log("gamestatus changed", gameStatus);

    if (gameStatus === "not started") {
      console.log("gamestatus changed", timerCount);
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
    <div className="gamescreen relative">
      <div className="w-full h-screen bg-neutral-800 flex justify-center p-8 relative">
        <Link
          to="/"
          className="absolute left-20 top-0 border rounded-md rotate-90 bg-white cursor-pointer py-2"
        >
          <img
            src="arrow.svg"
            width={40}
            onClick={() => {
              setGameStatus("not started");
            }}
          />
        </Link>
        <div className={`flex-col gap-4 w-[50rem] h-[50rem] flex`}>
          {/* {gameStatus === "running" && <GameBoard />} */}
          <GameBoard />
        </div>
      </div>

      {timerCount > 0 && gameStatus !== "running" && (
        <GameStartTimer timerTime={timerCount} />
      )}
      {gameStatus === "over" && <GameResult />}
    </div>
  );
};
export default GameScreen;
