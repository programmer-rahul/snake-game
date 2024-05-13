const GameStartTimer = ({ timerTime }: { timerTime: number }) => {
  return (
    <div className="gametimer absolute left-1/2 xl:top-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-slate-200 xl:text-9xl text-6xl">
      {String(timerTime)}
    </div>
  );
};
export default GameStartTimer;
