const GameBoard = () => {
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 800;

  return (
    <>
      <div className="gameboard w-full h-full">
        <canvas
          className="border-2 border-purple-600"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        ></canvas>
      </div>
      <div className="flex justify-between text-white">
        <div className="score">
          <p>Score</p>
          <span>{0}</span>
        </div>
        <div className="high-score">
          <p>High Score</p>
          <span>{0}</span>
        </div>
        G
      </div>
    </>
  );
};
export default GameBoard;
