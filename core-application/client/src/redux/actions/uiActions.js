import { CLEAR_ERRORS, SET_ERRORS } from "../type";

export const setErrors = (payload) => (dispatch) => {
  dispatch({ type: SET_ERRORS, payload });
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
