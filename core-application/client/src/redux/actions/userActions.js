import axios from "axios";
import {
  SET_ERRORS,
  SET_ALERT,
  SET_USER,
  SET_ALL_USERS,
  SET_UNAUTHENTICATED,
  SET_SEARCHED_USER,
} from "./../type";
import { setAlert } from "./alertAction";
import { setErrors } from "./uiActions";

export const signin = (userData, history) => (dispatch) => {
  axios
    .post("/api/v1/auth/signin", userData)
    .then((res) => {
      setAuthorizationToken(res.data.token);
      dispatch(getLoggedInUserData());
      dispatch(setAlert(res.data.msg, "success"));
      history.push("/dashboard");
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const signup = (userData, history) => (dispatch) => {
  axios
    .post("/api/v1/auth/signup", userData)
    .then((res) => {
      setAuthorizationToken(res.data.token);
      dispatch(getLoggedInUserData());
      dispatch(setAlert(res.data.msg, "success"));
      history.push("/dashboard");
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const getLoggedInUserData = () => (dispatch) => {
  axios
    .get("/api/v1/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data.user });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const getUserData = (userId) => (dispatch) => {
  axios
    .get(`/api/v1/user/${userId}`)
    .then((res) => {
      dispatch({ type: SET_SEARCHED_USER, payload: res.data.user });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const updateUser = (userData, userId, history) => (dispatch) => {
  axios
    .put("/api/v1/user", userData)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.push(`/profile/${userId}`);
      history.go(0);
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const getAllUsers = () => (dispatch) => {
  axios
    .get("/api/v1/user/all")
    .then((res) => {
      dispatch({ type: SET_ALL_USERS, payload: res.data.users });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const setAuthorizationToken = (recievedToken) => {
  const token = `Bearer ${recievedToken}`;
  localStorage.setItem("pt-token", token);
  axios.defaults.headers.common["Authorization"] = token;
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("pt-token");
  localStorage.removeItem("selectedProject");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};
