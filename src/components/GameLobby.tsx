import { Link } from "react-router-dom";

const GameLobby = () => {
  return (
    <div className="gamelobby">
      <div className="w-full h-screen bg-neutral-800 flex justify-center p-8">
        <div className="flex flex-col gap-4 w-[34rem] h-[50rem] items-center justify-center bg-slate-200 rounded-xl ">
          <h2 className="text-5xl text-purple-600 font-bold font-mono py-8">
            Snake Game
          </h2>
          <div className="flex flex-col gap-4">
            <button className="px-6 py-2 bg-blue-600 rounded-md text-slate-200 font-semibold text-2xl">
              <Link to="/play">Offline</Link>
            </button>
            <button className="px-6 py-2 bg-lime-600 rounded-md text-slate-200 font-semibold text-2xl">
              Multiplayer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameLobby;
