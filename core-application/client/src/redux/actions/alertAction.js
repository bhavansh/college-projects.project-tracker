import { REMOVE_ALERT, SET_ALERT } from "./../type";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      type: alertType,
    },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, 5000);
};
