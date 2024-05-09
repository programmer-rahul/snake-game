import Button from "./reusable/Button";

const GameResult = () => {
  return (
    <div className="gameresult absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[40rem] h-[40rem] bg-amber-200 p-8 flex-col flex justify-around">
        <h3 className="text-4xl font-semibold self-center">Game Over</h3>
        <div className="score py-8 self-center flex gap-2 items-center font-mono">
          <p className="text-3xl">Score :- </p>
          <p className="text-3xl">0</p>
        </div>

        <div className="flex gap-2">
          <Button type="primary" text="go back"></Button>
          <Button type="secondary" text="play again"></Button>
        </div>
      </div>
    </div>
  );
};
export default GameResult;
