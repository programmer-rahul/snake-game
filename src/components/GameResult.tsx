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
      <div className="xl:w-[40rem] xl:h-[40rem] w-[20rem] h-full bg-amber-200 xl:p-8 py-10 px-8 rounded-md flex-col flex justify-around">
        <h3 className="text-4xl font-semibold self-center">Game Over</h3>
        <div className="score py-8 self-center flex gap-2 items-center font-mono">
          <p className="xl:text-3xl text-2xl">Score :- </p>
          <p className="xl:text-3xl text-2xl">{gameScore}</p>
        </div>

        <div className="flex xl:gap-20 gap-2 flex-col xl:flex-row">
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
