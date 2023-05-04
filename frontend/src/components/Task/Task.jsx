import "./Task.scss";

const Task = ({ task }) => {
  const { subtasks } = task;
  return (
    <div className="task">
      <h3 className="task__title">{task.title}</h3>
      <p className="task__subtitle">0 of {subtasks.length} subtasks</p>
    </div>
  );
};

export default Task;
