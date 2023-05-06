import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "../../assets/icon-add-task-mobile.svg";
import Bin from "../../assets/icon-bin.svg";
import {
  ColumnFormToggle,
  DeleteBoardFormToggle,
} from "../../store/UI/ui.actions";
import {
  selectColumnFormToggle,
  selectDeleteBoardFormToggle,
} from "../../store/UI/ui.selector";
import DeleteBoardForm from "../DeleteBoardForm/DeleteBoardForm";
import NewColumnForm from "../NewColumnForm/NewColumnForm";
import Task from "../Task/Task";
import "./Board.scss";

const Board = ({ board }) => {
  const dispatch = useDispatch();
  const columnFormToggle = useSelector(selectColumnFormToggle);
  const { columns } = board;
  const deleteBoardFormToggle = useSelector(selectDeleteBoardFormToggle);
  return (
    <div className="board">
      <button
        className="board__delete"
        onClick={() => dispatch(DeleteBoardFormToggle(!deleteBoardFormToggle))}
      >
        <img src={Bin} alt="Bin SVG" />
      </button>
      {deleteBoardFormToggle ? <DeleteBoardForm /> : <Fragment />}
      {columnFormToggle ? <NewColumnForm /> : <Fragment />}
      {columns.length !== 0 ? (
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
          <div
            className="board__content--cta"
            onClick={() => dispatch(ColumnFormToggle(!columnFormToggle))}
          >
            <p className="board__content--cta--text">
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#828fa3"
                  d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
                />
              </svg>
              Create New Column
            </p>
          </div>
        </div>
      ) : (
        <div className="board__empty">
          <h1 className="board__empty--message">
            Create columns for adding tasks
          </h1>
          <button
            className="board__empty--cta"
            onClick={() => dispatch(ColumnFormToggle(!columnFormToggle))}
          >
            <img src={Add} alt="Add Logo" />
            Add New Column
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
