import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyToast from "./MyToast";

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      return (
        alert.msg !== "" && (
          <div key={alert.id}>
            <MyToast alert={alert} />
          </div>
        )
      );
    })
  );
};
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStatesToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStatesToProps)(Alert);
