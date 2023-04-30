import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Navigation from "../../components/Navigation/Navigation";
import { selectIsLoading } from "../../store/User/user.selector.js";
import "./DashBoard.scss";

const DashBoard = () => {
  const { isLoading } = useSelector(selectIsLoading);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Navigation />
        </div>
      )}
    </Fragment>
  );
};

export default DashBoard;
