import React from "react";

import DashNavbar from "./DashNavbar";
import { withRouter } from "react-router-dom";

const Dashboard = ({}) => {
  return (
    <div>
      <DashNavbar />
    </div>
  );
};

export default withRouter(Dashboard);
