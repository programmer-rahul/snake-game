import { createContext, ReactNode, useContext, useState } from "react";

export type GameStartedType = "not started" | "running" | "over";

interface ContextInterface {
  gameStatus: GameStartedType;
  setGameStatus: React.Dispatch<GameStartedType>;
  gameOver: boolean;
  setGameOver: React.Dispatch<boolean>;
}

const GameContext = createContext<ContextInterface>({
  gameStatus: "not started",
  setGameStatus: () => {},
  gameOver: false,
  setGameOver: () => {},
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStartedType>("not started");
  const [gameOver, setGameOver] = useState(false);
  return (
    <GameContext.Provider
      value={{
        gameStatus,
        setGameStatus,
        gameOver,
        setGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
