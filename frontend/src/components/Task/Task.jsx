import { useDispatch, useSelector } from "react-redux";
import { SelectTask } from "../../store/Task/task.actions";
import { selectTask } from "../../store/Task/task.selector";
import { SubtaskFormToggle } from "../../store/UI/ui.actions";
import "./Task.scss";

const Task = ({ task }) => {
  const { subtasks } = task;
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectTask);
  const onClickHandler = () => {
    dispatch(SelectTask(task));
    if (selectedTask) {
      dispatch(SubtaskFormToggle(true));
    }
  };
  return (
    <div className="task" onClick={onClickHandler}>
      <h3 className="task__title">{task.title}</h3>
      <p className="task__subtitle">
        {subtasks.filter((s) => s.isCompleted === true).length} of{" "}
        {subtasks.length} subtasks
      </p>
    </div>
  );
};

export default Task;
