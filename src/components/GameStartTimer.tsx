const GameStartTimer = ({ timerTime }: { timerTime: number }) => {
  return (
    <div className="gametimer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200 text-9xl">
      {String(timerTime)}
    </div>
  );
};
export default GameStartTimer;
