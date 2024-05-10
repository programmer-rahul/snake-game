import { createContext, ReactNode, useContext, useState } from "react";

interface ContextInterface {
  gameStatus: boolean;
  setGameStatus: React.Dispatch<boolean>;
}

const GameContext = createContext<ContextInterface>({
  gameStatus: false,
  setGameStatus: () => {},
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStatus, setGameStatus] = useState(false);
  return (
    <GameContext.Provider
      value={{
        gameStatus,
        setGameStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
