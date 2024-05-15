import { Link } from "react-router-dom";
import Button from "./reusable/Button";
import { useEffect } from "react";
// import { useGame } from "../context/GameContext";

const GameLobby = () => {
  // const { setGameStatus } = useGame();

  useEffect(() => {
    // setGameStatus("not started");
  }, []);

  return (
    <main className="gamelobby">
      <div className="flex max-h-dvh min-h-dvh w-full items-center justify-center overflow-hidden bg-gray-900">
        {/* container */}
        <div className="max-h-4/5 min-h-4/5 container flex w-4/5 flex-col gap-8 rounded-lg bg-indigo-300 px-8 py-16">
          <h2 className="text-center text-5xl">Xyz Xyz</h2>

          <div className="flex flex-col gap-2">
            <div>
              <Link to="/play">
                <Button text="offline" type="primary" />
              </Link>
            </div>
            <div>
              <Button text="multiplayer" type="secondary" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default GameLobby;
