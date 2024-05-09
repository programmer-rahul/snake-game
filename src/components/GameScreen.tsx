import { Link } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import GameResult from "./GameResult";

const GameScreen = () => {
  return (
    <div className="gamescreen relative">
      <div className="w-full h-screen bg-neutral-800 flex justify-center p-8 relative">
        <Link
          to="/"
          className="absolute left-20 top-0 border rounded-md rotate-90 bg-white cursor-pointer py-2"
        >
          <img src="arrow.svg" width={40} />
        </Link>
        <div className="flex flex-col gap-4 w-[50rem] h-[50rem]">
          <GameBoard />
        </div>
      </div>
      <GameResult />
    </div>
  );
};
export default GameScreen;
