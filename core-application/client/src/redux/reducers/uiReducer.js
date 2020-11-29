import {
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SUCCESS,
  CLEAR_SUCCESS,
  LOADING_UI,
  STOP_LOADING,
} from "./../type";

const initState = {
  loading: false,
  success: null,
  errors: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case SET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        success: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
