import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBoard } from "../../store/Boards/board.actions";
import {
  selectBoard,
  selectBoardDeletionMessage,
} from "../../store/Boards/board.selector";
import { DeleteBoardFormToggle } from "../../store/UI/ui.actions";
import "./DeleteBoardForm.scss";

const DeleteBoardForm = () => {
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();
  const boardDeletionMessage = useSelector(selectBoardDeletionMessage);

  const onClickHandler = () => {
    dispatch(DeleteBoard(board._id));
    if (boardDeletionMessage) {
      toast.success("Board Deleted Successfully");
      dispatch(DeleteBoardFormToggle(false));
    }
  };

  return (
    <div className="deleteBoardForm">
      <h1 className="deleteBoardForm__header">Delete this board?</h1>
      <p className="deleteBoardForm__text">
        Are you sure you want to delete the '{board?.name}' board? This action
        will remove all columns and Tasks and cannot be reversed.
      </p>
      <div className="deleteBoardForm__cta">
        <button
          className="deleteBoardForm__cta--delete"
          onClick={onClickHandler}
        >
          Delete
        </button>
        <button
          className="deleteBoardForm__cta--cancel"
          onClick={() => dispatch(DeleteBoardFormToggle(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBoardForm;
