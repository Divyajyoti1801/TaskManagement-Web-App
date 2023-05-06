import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../../components/Board/Board";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import NewBoardForm from "../../components/NewBoardForm/NewBoardForm";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AllBoards } from "../../store/Boards/board.actions";
import {
  selectBoard,
  selectBoards,
  selectIsBoardLoading,
} from "../../store/Boards/board.selector";
import { BoardFormToggle } from "../../store/UI/ui.actions";
import { selectBoardFormToggle } from "../../store/UI/ui.selector";
import "./DashBoard.scss";

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllBoards);
  }, [dispatch]);

  const Boards = useSelector(selectBoards);
  const board = useSelector(selectBoard);
  const isBoardLoading = useSelector(selectIsBoardLoading);
  const boardFormToggle = useSelector(selectBoardFormToggle);
  return (
    <div className="dashboard">
      {boardFormToggle ? <NewBoardForm /> : <Fragment></Fragment>}
      <Navigation />
      <div className="dashboardMain">
        <Sidebar Boards={Boards} />
        <div className="dashboardMain__canvas">
          {isBoardLoading ? (
            <Loader />
          ) : (
            <Fragment>
              {!board ? (
                <div className="dashboardMain__canvas--empty">
                  <h3 className="dashboardMain__canvas--empty--text">
                    No board is selected / Create new board
                  </h3>
                  <button
                    className="dashboardMain__canvas--empty--cta"
                    onClick={() => dispatch(BoardFormToggle(!boardFormToggle))}
                  >
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                        fill="#828FA3"
                      />
                    </svg>
                    Create New Board
                  </button>
                </div>
              ) : (
                <Board board={board} />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
