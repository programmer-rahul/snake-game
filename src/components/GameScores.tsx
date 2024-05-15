import { useGame } from "../context/GameContext";

const GameScores = () => {
  const { gameScore, highScore } = useGame();

  return (
    <div
      className={`gameinfo mx-auto flex h-auto w-auto justify-between gap-20 rounded-md border-2 border-slate-200 bg-indigo-400 p-4 lg:w-[700px]`}
    >
      <div className="scorecard flex items-center gap-2">
        <p>
          Score :- <strong>{gameScore}</strong>
        </p>
      </div>
      <div className="highscore flex items-center gap-2">
        <p>
          HighScore :- <strong>{highScore}</strong>
        </p>
      </div>
    </div>
  );
};
export default GameScores;
