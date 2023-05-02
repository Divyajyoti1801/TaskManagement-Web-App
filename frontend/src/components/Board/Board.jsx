import "./Board.scss";

const Board = ({ board }) => {
  const { Columns } = board;
  return <div className="board">{board.name}</div>;
};

export default Board;
