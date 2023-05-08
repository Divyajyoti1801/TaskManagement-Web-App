import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../assets/icon-cross.svg";
import { OneBoard } from "../../store/Boards/board.actions";
import { selectBoard } from "../../store/Boards/board.selector";
import { CreateTask } from "../../store/Task/task.actions";
import { selectCreateTaskMessage } from "../../store/Task/task.selector";
import { AddtaskFormToggle } from "../../store/UI/ui.actions";
import "./NewTaskForm.scss";

const NewTaskForm = () => {
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);
  const statusOption = board.columns.map((col) => col.name);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statusOption[0]);
  const [subtasks, setSubtasks] = useState([""]);
  const createTaskMessage = useSelector(selectCreateTaskMessage);

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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const subtasksData = subtasks.map((s) => ({ title: s }));
    dispatch(CreateTask(board._id, title, description, status, subtasksData));
    if (createTaskMessage) {
      toast.success("Task Created Successfully");
      dispatch(OneBoard(board._id));
    }
  };

  return (
    <div className="newTaskForm">
      <form className="newTask" onSubmit={onSubmitHandler}>
        <button
          className="newTask__cross"
          onClick={() => dispatch(AddtaskFormToggle(false))}
        >
          <img src={cross} alt="cross SVG" />
        </button>
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
            <div
              type={index}
              key={index}
              className="newTask__container--subtask"
            >
              <input
                type="text"
                value={subtask}
                onChange={(event) => handleSubtaskChange(event, index)}
                required
                placeholder="Subtask title"
                className="newTask__container--subtask--input"
              />
              <button
                onClick={() => handleRemoveSubtask(index)}
                className="newTask__container--subtask--cta"
              >
                <img src={cross} alt="Cross SVG" />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddSubtask}
            className="newTask__container--add"
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#635fc7"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
            Add New Subtask
          </button>
        </div>
        <div className="newTask__container">
          <label className="newTask__container--label">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="newTask__container--select"
          >
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
