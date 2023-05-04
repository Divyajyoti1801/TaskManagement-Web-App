import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../../components/Board/Board";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AllBoards } from "../../store/Boards/board.actions";
import {
  selectBoard,
  selectBoards,
  selectIsBoardLoading,
} from "../../store/Boards/board.selector";
import "./DashBoard.scss";

const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllBoards);
  }, [dispatch]);

  const Boards = useSelector(selectBoards);
  const board = useSelector(selectBoard);
  const isBoardLoading = useSelector(selectIsBoardLoading);
  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboardMain">
        <Sidebar Boards={Boards} />
        <div className="dashboardMain__canvas">
          {isBoardLoading ? <Loader /> : <Board board={board} />}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
