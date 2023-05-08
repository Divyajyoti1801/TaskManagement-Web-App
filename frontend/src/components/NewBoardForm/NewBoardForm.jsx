import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import cross from "../../assets/icon-cross.svg";
import { CreateBoard } from "../../store/Boards/board.actions";
import { selectBoardCreateMessage } from "../../store/Boards/board.selector";
import { BoardFormToggle } from "../../store/UI/ui.actions";
import { selectChangeTheme } from "../../store/UI/ui.selector";
import "./NewBoardForm.scss";

const NewBoardForm = () => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([""]);
  const changeTheme = useSelector(selectChangeTheme);

  const OnChangeBoardName = (event) => setBoardName(event.target.value);

  const OnChangeHandlerColumn = (event, index) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = event.target.value;
    setColumns(updatedColumns);
  };

  const handleAddColumns = () => setColumns([...columns, ""]);

  const handleDeleteColumns = (index) => {
    const updatedColumns = [...columns];
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };
  const boardCreationMessage = useSelector(selectBoardCreateMessage);
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const name = boardName;
    const dataColumns = columns.map((col) => ({ name: col }));
    dispatch(CreateBoard(name, dataColumns));

    if (boardCreationMessage) {
      toast.success(boardCreationMessage);
      setBoardName("");
      setColumns([]);
      dispatch(BoardFormToggle(false));
      toast.error("Board Not Created");
    }
  };
  return (
    <div className="boardFormContainer">
      <form
        className={`boardForm ${changeTheme ? `` : `darkBackground`}`}
        onSubmit={onSubmitHandler}
      >
        <button
          className="boardForm__close"
          onClick={() => dispatch(BoardFormToggle(false))}
        >
          <img src={cross} alt="Cross SVG" />
        </button>
        <h1 className="boardForm__header">Add New Board</h1>
        <div className="boardForm__container">
          <label className="boardForm__container--label">Name</label>
          <input
            type="text"
            className="boardForm__container--input"
            placeholder="e.g. Web Design"
            value={boardName}
            onChange={OnChangeBoardName}
            required
          />
        </div>
        <div className="boardForm__container">
          <label className="boardForm__container--label">Columns</label>
          {columns.map((col, index) => (
            <div key={index} className="boardForm__container--array">
              <input
                type="text"
                value={col}
                className="boardForm__container--array--input"
                onChange={(event) => OnChangeHandlerColumn(event, index)}
                required
                placeholder="Column Name"
              />
              <button
                type="button"
                className="boardForm__container--array--cta"
                onClick={() => handleDeleteColumns(index)}
              >
                <img src={cross} alt="Cross SVG" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="column-cta"
            onClick={handleAddColumns}
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
            Add New Column
          </button>
        </div>
        <button type="submit" className="boardForm__btn">
          Create Board
        </button>
      </form>
    </div>
  );
};

export default NewBoardForm;
