import { useDispatch, useSelector } from "react-redux";
import Add from "../../assets/icon-add-task-mobile.svg";
import Logo from "../../assets/logo-dark.svg";
import { selectBoard } from "../../store/Boards/board.selector";
import { LogoutUser } from "../../store/User/user.actions";
import { selectUser } from "../../store/User/user.selector";
import "./Navigation.scss";

const Navigation = () => {
  const user = useSelector(selectUser);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();

  //Logout Handler
  const logoutHandler = () => dispatch(LogoutUser);

  return (
    <div className="navigation">
      <div className="navigation__header">
        <img src={Logo} alt="Logo" className="navigation__header--logo" />
      </div>
      <nav className="navigation__nav">
        <h2 className="navigation__nav-- title">
          {board ? `${board.name}` : `Board`}
        </h2>
        <div className="navigation__nav--menu">
          <p className="navigation__nav--menu--user">{user.name}</p>
          <button className="navigation__nav--menu--cta">
            <img src={Add} alt="Add SVG" /> &nbsp; Add New Task
          </button>
          <button
            className="navigation__nav--menu--cta"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
