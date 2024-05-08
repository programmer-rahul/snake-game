import GameBoard from "../components/GameBoard";

const GameScreen = () => {
  return (
    <div className="gamescreen">
      <div className="w-full h-screen bg-neutral-800 flex justify-center p-8">
        <div className="flex flex-col gap-4 w-[50rem] h-[50rem]">
          <GameBoard />
        </div>
      </div>
    </div>
  );
};
export default GameScreen;
