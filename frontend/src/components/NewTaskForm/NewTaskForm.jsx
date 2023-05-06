import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import add from "../../assets/icon-add-task-mobile.svg";
import cross from "../../assets/icon-cross.svg";
import { selectBoard } from "../../store/Boards/board.selector";
import "./NewTaskForm.scss";

const NewTaskForm = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const statusOption = board.columns.map((col) => col.name);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statusOption[0]);
  const [subtasks, setSubtasks] = useState([""]);

  const handleSubtaskChange = (event, index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = event.target.value;
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="newTaskForm">
      <form className="newTask">
        <h1 className="newTask__header">Add New Task</h1>
        <div className="newTask__container">
          <label className="newTask__container--label">Title</label>
          <input
            type="text"
            className="newTask__container--input"
            placeholder="Title of task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="newTask__container">
          <label className="newTask__container--label">Description</label>
          <input
            type="text"
            className="newTask__container--input"
            placeholder="Description of task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="newTask__container">
          <label className="newTask__container--label">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div type={index}>
              <input
                type="text"
                value={subtask}
                onChange={(event) => handleSubtaskChange(event, index)}
                required
                placeholder="Subtask title"
              />
              <button onClick={() => handleRemoveSubtask(index)}>
                <img src={cross} alt="Cross SVG" />
              </button>
            </div>
          ))}
          <button onClick={handleAddSubtask}>
            <img src={add} alt="Add SVG" />
            Add New Subtask
          </button>
        </div>
        <div className="newTask__container">
          <label className="newTask__container--label">Status</label>
          <select value={status} onChange={handleStatusChange}>
            {statusOption?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="newTask__submit">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default NewTaskForm;
