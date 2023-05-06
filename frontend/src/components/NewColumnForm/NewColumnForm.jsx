import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../assets/icon-cross.svg";
import { CreateColumn } from "../../store/Boards/board.actions";
import { selectBoard } from "../../store/Boards/board.selector";
import { ColumnFormToggle } from "../../store/UI/ui.actions";
import "./NewColumnForm.scss";

const NewColumnForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const board = useSelector(selectBoard);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(CreateColumn(board._id, name));
    setName("");
    toast.success("Column Creation Successfully");
    dispatch(ColumnFormToggle(false));
  };

  return (
    <form className="columnForm" onSubmit={onSubmitHandler}>
      <button
        className="columnForm__close"
        onClick={() => dispatch(ColumnFormToggle(false))}
      >
        <img src={cross} alt="Cross SVG" />
      </button>
      <h1 className="columnForm__header">Add New Column</h1>
      <div className="columnForm__container">
        <label className="columnForm__container--label">Column</label>
        <input
          className="columnForm__container--input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Column name"
          required
        />
      </div>
      <button type="submit" className="columnForm__cta">
        Create New Column
      </button>
    </form>
  );
};

export default NewColumnForm;
