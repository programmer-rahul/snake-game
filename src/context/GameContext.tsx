import { createContext, ReactNode, useContext, useState } from "react";
import { LocalStorage } from "../utils/helper";

export type GameStartedType = "not started" | "running" | "over";

interface ContextInterface {
  gameStatus: GameStartedType;
  setGameStatus: React.Dispatch<GameStartedType>;
  gameScore: number;
  setGameScore: React.Dispatch<number>;
  highScore: number;
  setHighScore: React.Dispatch<number>;
}

const GameContext = createContext<ContextInterface>({
  gameStatus: "not started",
  setGameStatus: () => {},
  gameScore: 0,
  setGameScore: () => {},
  highScore: 0,
  setHighScore: () => {},
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStartedType>("not started");
  const [gameScore, setGameScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    let high = LocalStorage.get("snakeHighScore");
    return high ? high : 0;
  });
  return (
    <GameContext.Provider
      value={{
        gameStatus,
        setGameStatus,
        gameScore,
        setGameScore,
        highScore,
        setHighScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
