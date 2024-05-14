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
      <div className="flex max-h-svh min-h-svh w-full items-center justify-center border border-red-500 bg-neutral-800 p-2 xl:p-8">
        <div className="flex h-3/5 flex-col items-center justify-center gap-4 rounded-xl border bg-slate-200 p-4 xl:h-[50rem] xl:w-[34rem]">
          <h2 className="py-8 font-mono text-4xl font-bold xl:text-5xl">
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
