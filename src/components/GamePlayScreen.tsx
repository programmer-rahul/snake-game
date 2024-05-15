import GameResult from "./GameResult";
import { useEffect, useState } from "react";
import GameStartTimer from "./GameStartTimer";
import { useGame } from "../context/GameContext";
import GameBoard from "./GameBoard";
import GameScores from "./GameScores";

const GamePlayScreen = () => {
  const { gameStatus, setGameStatus } = useGame();
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

  useEffect(() => {
    if (gameStatus === "over") {
      setGameStatus("not started");
    }
  }, []);

  return (
    <div className="gameplayscreen">
      <div className="max-h-dvh min-h-dvh w-full bg-gray-900 ">
        <div className="container flex flex-col items-center gap-4 border p-2">
          <GameBoard />
          <GameScores />
        </div>

        <div>
          {timerCount > 0 && gameStatus !== "running" && (
            <GameStartTimer timerTime={timerCount} />
          )}
          {gameStatus === "over" && <GameResult />}
        </div>
      </div>
    </div>
  );
};
export default GamePlayScreen;
