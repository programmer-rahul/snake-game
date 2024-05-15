import { Link } from "react-router-dom";
import Button from "./reusable/Button";
import { useGame } from "../context/GameContext";

const GameResult = () => {
  const { setGameStatus, gameScore } = useGame();

  const playAgainHandler = () => {
    setGameStatus("not started");
  };

  return (
    <div className="gameresult absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-full w-[20rem] flex-col justify-around rounded-md bg-amber-200 px-8 py-10 xl:h-[40rem] xl:w-[40rem] xl:p-8">
        <h3 className="self-center text-4xl font-semibold">Game Over</h3>
        <div className="score flex items-center gap-2 self-center py-8 font-mono">
          <p className="text-2xl xl:text-3xl">Score :- </p>
          <p className="text-2xl xl:text-3xl">{gameScore}</p>
        </div>

        <div className="flex flex-col gap-2 xl:flex-row xl:gap-20">
          <Link to="/" className="w-full">
            <Button type="primary" text="go back" />
          </Link>
          <div className="w-full">
            <Button
              type="secondary"
              text="play again"
              clickHandler={playAgainHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameResult;
