import {
  SET_UNAUTHENTICATED,
  SET_ALL_USERS,
  SET_USER,
  SET_AUTHENTICATED,
  SET_SEARCHED_USER,
} from "../type";

const initState = {
  authenticated: false,
  credentials: {},
  users: null,
  user: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        credentials: action.payload,
      };
    case SET_SEARCHED_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_UNAUTHENTICATED:
      return initState;
    default:
      return state;
  }
}
