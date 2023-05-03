import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../../components/Board/Board";
import BoardSelector from "../../components/BoardSelector/BoardSelector";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import { AllBoards } from "../../store/Boards/board.actions";
import {
  selectBoard,
  selectBoards,
  selectIsBoardLoading,
} from "../../store/Boards/board.selector";
import { selectIsLoading } from "../../store/User/user.selector.js";
import "./DashBoard.scss";

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllBoards);
  }, [dispatch]);

  const isLoading = useSelector(selectIsLoading);
  const Boards = useSelector(selectBoards);
  const board = useSelector(selectBoard);
  const isBoardLoading = useSelector(selectIsBoardLoading);

  return (
    <div className="dashboard">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard__main">
          <div className="dashboard__main--navigation">
            <Navigation />
          </div>
          <div className="dashboard__main--content">
            <div className="dashboard__main--content--sidebar">
              <h2 className="dashboard__main--content--sidebar--header">
                ALL BOARDS({Boards?.length})
              </h2>
              {Boards?.map((board) => (
                <BoardSelector key={board._id} board={board} />
              ))}
            </div>
            <div className="dashboard__main--content--board">
              {isBoardLoading ? (
                <div className="dashboard__main--content--board--loader">
                  <Loader />
                </div>
              ) : (
                <Board key={board._id} board={board} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
