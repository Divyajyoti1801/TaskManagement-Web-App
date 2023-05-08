import { useDispatch, useSelector } from "react-redux";
import Add from "../../assets/icon-add-task-mobile.svg";
import DownArrow from "../../assets/icon-chevron-down.svg";
import UpArrow from "../../assets/icon-chevron-up.svg";
import Logo from "../../assets/logo-dark.svg";
import darkLogo from "../../assets/logo-light.svg";
import MobileLogo from "../../assets/logo-mobile.svg";
import { selectBoard } from "../../store/Boards/board.selector";
import { AddtaskFormToggle, toggleSidebar } from "../../store/UI/ui.actions";
import {
  selectAddtaskFormToggle,
  selectChangeTheme,
  selectSidebarToggle,
} from "../../store/UI/ui.selector";
import { LogoutUser } from "../../store/User/user.actions";
import { selectUser } from "../../store/User/user.selector";
import "./Navigation.scss";

const Navigation = () => {
  const user = useSelector(selectUser);
  const board = useSelector(selectBoard);
  const dispatch = useDispatch();
  const sidebarToggle = useSelector(selectSidebarToggle);
  const addTaskFormToggle = useSelector(selectAddtaskFormToggle);
  const changeTheme = useSelector(selectChangeTheme);

  //Logout Handler
  const logoutHandler = () => dispatch(LogoutUser);

  //Sidebar Toggle Handler
  const sidebarToggleHandler = () => dispatch(toggleSidebar(!sidebarToggle));

  return (
    <div className={`navigation ${changeTheme ? `` : `darkNavigation`}`}>
      <div
        className={`navigation__header ${
          changeTheme ? `` : `darkNavigation__header`
        }`}
      >
        <img
          src={changeTheme ? Logo : darkLogo}
          alt="Logo"
          className="navigation__header--logo"
        />
        <div className="navigation__header--mobile">
          <img src={MobileLogo} alt="Mobile Logo" />
          <h3>{board ? `${board?.name}` : `Board`}</h3>
          <img
            src={sidebarToggle ? UpArrow : DownArrow}
            alt="Down Arrow"
            onClick={sidebarToggleHandler}
          />
        </div>
      </div>
      <nav
        className={`navigation__nav ${
          changeTheme ? `` : `darkNavigation__nav`
        }`}
      >
        <h2
          className={`navigation__nav--title ${
            changeTheme ? `` : `darkNavigation__nav--title`
          }`}
        >
          {board ? `${board?.name}` : `Board`}
        </h2>
        <div className="navigation__nav--menu">
          <p
            className={`navigation__nav--menu--user ${
              changeTheme ? `` : `darkText`
            }`}
          >
            {user?.name}
          </p>
          <button
            className="navigation__nav--menu--cta-1"
            onClick={() => dispatch(AddtaskFormToggle(!addTaskFormToggle))}
            disabled={board && board?.columns ? false : true}
          >
            <img src={Add} alt="Add SVG" /> &nbsp; Add New Task
          </button>
          <button
            className="navigation__nav--menu--mobile-cta"
            onClick={() => dispatch(AddtaskFormToggle(!addTaskFormToggle))}
            disabled={board && board?.columns ? false : true}
          >
            <img src={Add} alt="Add SVG" />
          </button>
          <button
            className="navigation__nav--menu--cta-2"
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
