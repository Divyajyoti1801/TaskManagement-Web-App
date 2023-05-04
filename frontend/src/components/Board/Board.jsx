import Task from "../Task/Task";
import "./Board.scss";

const Board = ({ board }) => {
  const { columns } = board;
  return (
    <div className="board">
      {!columns ? (
        <div className="board__empty">
          <h1 className="board__empty--message">
            Please Select Board / Create Board
          </h1>
          /
        </div>
      ) : (
        <div className="board__content">
          {columns.map((column) => (
            <div className="column">
              <h3 className="column__header">
                {column.name} ({column.tasks.length})
              </h3>
              {column.tasks?.map((task) => (
                <Task task={task} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
