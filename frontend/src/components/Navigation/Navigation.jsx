import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo-dark.svg";
import { LogoutUser } from "../../store/User/user.actions";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../store/User/user.selector";
import "./Navigation.scss";

const Navigation = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(LogoutUser);
    if (!isAuthenticated) {
      toast.success("User Logout Successful");
      navigate("/");
    }
  };
  return (
    <div className="navigation">
      <div className="navigation__header">
        <img src={LOGO} alt="Kanban Logo" className="navigation__header--img" />
      </div>
      <div className="navigation__nav">
        <h2 className="navigation__nav--title"> Platform Launch</h2>
        <div className="navigation__nav--cta">
          <h2 className="navigation__nav--cta--user">{user.name}</h2>
          <button
            className="navigation__nav--cta--btn"
            onClick={onClickHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
