import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import { AllBoards } from "../../store/Boards/board.actions";
import {
  selectBoards,
  selectIsBoardsLoading,
} from "../../store/Boards/board.selector";
import { selectIsLoading } from "../../store/User/user.selector.js";
import "./DashBoard.scss";

const DashBoard = () => {
  useEffect(() => {
    dispatch(AllBoards);
  });
  const { isLoading } = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const isBoardLoading = useSelector(selectIsBoardsLoading);
  const Boards = useSelector(selectBoards);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Navigation />
          <div className="dashboard__main">
            <div className="dashboard__main--sidebar"></div>
            {Boards.map((b) => (
              <p>{b.name}</p>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DashBoard;
