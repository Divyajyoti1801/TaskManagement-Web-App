import { useDispatch, useSelector } from "react-redux";
import DarkApp from "../../assets/icon-dark-theme.svg";
import LightApp from "../../assets/icon-light-theme.svg";
import {
  BoardFormToggle,
  changeTheme as ChangeTheme,
} from "../../store/UI/ui.actions";
import {
  selectBoardFormToggle,
  selectChangeTheme,
  selectSidebarToggle,
} from "../../store/UI/ui.selector";
import BoardSelector from "../BoardSelector/BoardSelector";
import "./Sidebar.scss";

const Sidebar = ({ Boards }) => {
  const dispatch = useDispatch();
  const changeTheme = useSelector(selectChangeTheme);
  const sidebarToggle = useSelector(selectSidebarToggle);
  const boardFormToggle = useSelector(selectBoardFormToggle);

  const onChangeHandler = () => {
    return dispatch(ChangeTheme(!changeTheme));
  };

  return (
    <div
      className={`sidebar ${sidebarToggle ? `` : `sidebar__hidden`} ${
        changeTheme ? `` : `darkBackground darkLine`
      }`}
    >
      <div className="sidebar__nav">
        <h2 className="sidebar__nav--header">
          ALL BOARDS ({Boards ? `${Boards?.length}` : `0`})
        </h2>
        {Boards?.map((board) => (
          <BoardSelector key={board?._id} board={board} />
        ))}
        <button
          className="sidebar__nav--btn"
          onClick={() => dispatch(BoardFormToggle(!boardFormToggle))}
        >
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="#828FA3"
            />
          </svg>
          + Create New Board
        </button>
      </div>
      <div
        className={`sidebar__mode ${
          changeTheme ? `` : `darkComponentBackground`
        }`}
      >
        <img src={LightApp} alt="Light Mode Icon" />
        <label className="switch">
          <input type="checkbox" onChange={onChangeHandler} />
          <span className="slider"></span>
        </label>
        <img src={DarkApp} alt="Dark Mode Icon" />
      </div>
    </div>
  );
};

export default Sidebar;
