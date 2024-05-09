import { Link } from "react-router-dom";
import Button from "./reusable/Button";

const GameLobby = () => {
  return (
    <div className="gamelobby relative">
      <div className="w-full h-screen bg-neutral-800 flex justify-center p-8">
        <div className="flex flex-col gap-4 w-[34rem] h-[50rem] items-center justify-center bg-slate-200 rounded-xl ">
          <h2 className="text-5xl text-purple-600 font-bold font-mono py-8">
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
