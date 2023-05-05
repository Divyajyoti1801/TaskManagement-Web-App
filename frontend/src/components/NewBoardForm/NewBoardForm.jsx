import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./NewBoardForm.scss";

const defaultFormInput = {
  name: "",
  columns: [],
};

const NewBoardForm = () => {
  const [formInput, setFormInput] = useState(defaultFormInput);
  //const dispatch = useDispatch();
  return (
    <form className="boardForm">
      <h1 className="boardForm__header">Add New Board</h1>
      <div className="boardForm__container">
        <label className="boardForm__container--label">Name</label>
        <input
          type="text"
          className="boardForm__container--input"
          placeholder="e.g. Web Design"
          required
        />
      </div>
      <div className="boardForm__container">
        <label className="boardForm__container--label">Columns</label>
        <input type="text" className="boardForm__container--input" />
        <button className="column-cta">
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF"
              d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
            />
          </svg>
          Add New Column
        </button>
      </div>
      <button className="boardForm__btn">Create Board</button>
    </form>
  );
};

export default NewBoardForm;
