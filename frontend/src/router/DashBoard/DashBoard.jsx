import { useSelector } from "react-redux";
import Navigation from "../../components/Navigation/Navigation";
import Sidebar from "../../components/Sidebar/Sidebar";
import { selectBoards } from "../../store/Boards/board.selector";
import "./DashBoard.scss";

const DashBoard = () => {
  const Boards = useSelector(selectBoards);
  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboardMain">
        <Sidebar Boards={Boards} />
      </div>
    </div>
  );
};

export default DashBoard;
