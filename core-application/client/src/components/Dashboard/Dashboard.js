import React from "react";

import DashNavbar from "./DashNavbar";
import { withRouter } from "react-router-dom";

const Dashboard = ({ history }) => {
  return (
    <div>
      <DashNavbar history={history} />
    </div>
  );
};

export default withRouter(Dashboard);
