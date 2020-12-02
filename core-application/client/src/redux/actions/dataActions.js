import axios from "axios";
import { setAlert } from "./alertAction";
import {
  SET_PROJECTS,
  SET_CURRENT_PROJECT,
  SET_PROJECT_MEMBERS,
  SET_TODOS,
  SET_TODO,
  REMOVE_TODO,
  SET_PROJECT,
  SET_CHAT_TOXICITIES,
  SET_CHAT_TOXICITY,
  REMOVE_CHAT_TOXICITY,
} from "./../type";
import { setErrors } from "./uiActions";

export const createProject = (projectData, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post("/api/v1/project/create", projectData, config)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.push("/projects");
    })
    .catch((err) => {
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const updateProject = (projectData, projectId, history) => (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .put(`/api/v1/project/${projectId}`, projectData, config)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.push("/projects");
    })
    .catch((err) => {
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const joinOrRomoveUserfromProject = (
  projectId,
  userId,
  toBeJoin,
  history
) => (dispatch) => {
  axios
    .post(`/api/v1/project/${toBeJoin}/${projectId}/${userId}`)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.go(0);
    })
    .catch((err) => {
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const toggleBanUserfromProject = (projectId, userId, history) => (
  dispatch
) => {
  axios
    .put(`/api/v1/project/ban/${projectId}/${userId}`)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.go(0);
    })
    .catch((err) => {
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const getAProject = (projectId) => (dispatch) => {
  axios
    .get(`/api/v1/project/${projectId}`)
    .then((res) => {
      dispatch({
        type: SET_PROJECT,
        payload: res.data.project,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const getAllProjectsForAUser = () => (dispatch) => {
  axios
    .get("/api/v1/project/all")
    .then((res) => {
      dispatch({
        type: SET_PROJECTS,
        payload: res.data.projects,
      });
    })
    .catch((err) => {
      console.log(err.response.data.error);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const getAllProjectMembers = (projectId) => (dispatch) => {
  axios
    .get(`/api/v1/project/all/members/${projectId}`)
    .then((res) => {
      dispatch({
        type: SET_PROJECT_MEMBERS,
        payload: res.data.members,
      });
    })
    .catch((err) => {
      console.log(err.response.data.error);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const selectACurrentProject = (project) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_PROJECT,
    payload: project,
  });
};

// Todos
export const createTodo = (todoData, projectId, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(`/api/v1/todo/create/${projectId}`, todoData, config)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.push("/todos");
    })
    .catch((err) => {
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const updateTodo = (todoData, todoId, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .put(`/api/v1/todo/${todoId}`, todoData, config)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.push("/todos");
    })
    .catch((err) => {
      if (err.response.data.error) {
        dispatch(setAlert(err.response.data.error, "error"));
      } else {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const getATodo = (todoId) => (dispatch) => {
  axios
    .get(`/api/v1/todo/${todoId}`)
    .then((res) => {
      dispatch({
        type: SET_TODO,
        payload: res.data.todo,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const removeATodoFromRedux = () => (dispatch) => {
  dispatch({
    type: REMOVE_TODO,
  });
};

export const getAllTodosOfProject = (projectId) => (dispatch) => {
  axios
    .get(`/api/v1/todo/all/${projectId}`)
    .then((res) => {
      dispatch({
        type: SET_TODOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const deleteATodo = (todoId, history) => (dispatch) => {
  console.log("todoId");
  axios
    .delete(`/api/v1/todo/${todoId}`)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "success"));
      history.go(0);
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

// Chat Toxicity

export const postAToxicity = (chatToxicityData, projectId) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(`/api/v1/chat-toxicity/${projectId}`, chatToxicityData, config)
    .then((res) => {
      dispatch(setAlert(res.data.msg, "error"));
    })
    .catch((err) => {
      console.log(err.response.data.error);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const removeToxicity = () => (dispatch) => {
  dispatch({
    type: REMOVE_CHAT_TOXICITY,
  });
};

export const getAllToxitiesOfAUserFromARoom = (userId, projectId) => (
  dispatch
) => {
  axios
    .get(`/api/v1/chat-toxicity/all/${projectId}/${userId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_CHAT_TOXICITY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data.error);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};

export const getAllMembersToxicity = (projectId) => (dispatch) => {
  axios
    .get(`/api/v1/chat-toxicity/all/${projectId}`)
    .then((res) => {
      dispatch({
        type: SET_CHAT_TOXICITIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data.error);
      dispatch(setAlert(err.response.data.error, "error"));
    });
};
