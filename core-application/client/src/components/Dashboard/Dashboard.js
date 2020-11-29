import React from "react";
import PropTypes from "prop-types";
import DashNavbar from "./DashNavbar";
import { withRouter } from "react-router-dom";

const Dashboard = ({}) => {
  return (
    <div>
      <DashNavbar />
    </div>
  );
};

Dashboard.propTypes = {};

export default withRouter(Dashboard);
