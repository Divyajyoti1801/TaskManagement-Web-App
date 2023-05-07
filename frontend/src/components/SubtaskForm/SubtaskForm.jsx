import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../assets/icon-cross.svg";
import { selectBoard } from "../../store/Boards/board.selector";
import { selectTask, selectTaskLoading } from "../../store/Task/task.selector";
import { SubtaskFormToggle } from "../../store/UI/ui.actions";
import Loader from "../Loader/Loader";
import "./SubtaskForm.scss";

const SubtaskForm = () => {
  const taskLoading = useSelector(selectTaskLoading);
  const task = useSelector(selectTask);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.status);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();

  const handleSubtaskChange = (event, index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].isCompleted = event.target.checked;
    setSubtasks(newSubtasks);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="subtaskFormContainer">
      {taskLoading ? (
        <Loader />
      ) : (
        <form className="subtaskForm">
          <button
            className="subtaskForm__cross"
            onClick={() => dispatch(SubtaskFormToggle(false))}
          >
            <img src={cross} alt="Cross SVG" />
          </button>
          <h2 className="subtaskForm__header">{task.title}</h2>
          {task.description ? (
            <p className="subtaskForm__description">{task.description}</p>
          ) : (
            <Fragment />
          )}
          <div className="subtaskForm__container">
            <label className="subtaskForm__container--label">
              Subtasks ( {subtasks.filter((s) => s.isCompleted === true).length}{" "}
              of {subtasks.length} )
            </label>
            {subtasks.map((subtask, index) => (
              <div key={index} className="subtaskForm__container--content">
                <input
                  type="checkbox"
                  className="subtaskForm__container--content--input"
                  onChange={(event) => handleSubtaskChange(event, index)}
                />
                <label className="subtaskForm__container--content--label">
                  {subtask.isCompleted ? (
                    <s className="subtaskForm__container--content--label--strike">
                      {subtask.title}
                    </s>
                  ) : (
                    <p className="subtaskForm__container--content--label--text">
                      {subtask.title}
                    </p>
                  )}
                </label>
              </div>
            ))}
          </div>
          <div className="subtaskForm__container">
            <label className="subtaskForm__container--label">
              Current Status
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="subtaskForm__container--select"
            >
              {board.columns.map((column) => (
                <option key={column._id} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
          <div className="subtaskForm__cta">
            <button className="subtaskForm__cta--delete">Delete Task</button>
            <button className="subtaskForm__cta--submit" type="submit">
              Update Task Progress
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SubtaskForm;
