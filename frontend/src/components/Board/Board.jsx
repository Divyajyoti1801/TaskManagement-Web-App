import Add from "../../assets/icon-add-task-mobile.svg";
import Task from "../Task/Task";
import "./Board.scss";

const Board = ({ board }) => {
  const { columns } = board;
  return (
    <div className="board">
      {!columns ? (
        <div className="board__empty">
          <h1 className="board__empty--message">Create Column</h1>
          <button className="board__empty--cta">
            <img src={Add} alt="Add Logo" />
            Add New Column
          </button>
        </div>
      ) : (
        <div className="board__content">
          {columns.map((column) => (
            <div className="column">
              <h3 className="column__header">
                {column.name} ({column.tasks.length})
              </h3>
              {column.tasks?.map((task) => (
                <Task key={task._id} task={task} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Board;
