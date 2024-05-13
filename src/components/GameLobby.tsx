import { Link } from "react-router-dom";
import Button from "./reusable/Button";
import { useEffect } from "react";
import { useGame } from "../context/GameContext";

const GameLobby = () => {
  const { setGameStatus } = useGame();

  useEffect(() => {
    setGameStatus("not started");
  }, []);

  return (
    <div className="gamelobby relative">
      <div className="w-full h-screen bg-neutral-800 flex justify-center items-center xl:p-8 p-2">
        <div className="flex flex-col gap-4 xl:w-[34rem] xl:h-[50rem] h-[70%] p-4 items-center justify-center bg-slate-200 rounded-xl ">
          <h2 className="xl:text-5xl text-4xl text-purple-600 font-bold font-mono py-8">
            Snake Game
          </h2>
          <div className="flex flex-col gap-4">
            <Link to="/play">
              <Button type="primary" text="offline" />
            </Link>
            <Button type="secondary" text="multiplayer" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameLobby;
