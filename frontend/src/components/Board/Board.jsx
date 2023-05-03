import "./Board.scss";

const Board = ({ board }) => {
  const { columns } = board;
  return (
    <div className="board">
      {columns.map((c) => (
        <div className="board__column">
          <p className="board__column--title">{c.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Board;
