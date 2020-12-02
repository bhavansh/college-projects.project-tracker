import {
  SET_PROJECT,
  SET_PROJECTS,
  SET_CURRENT_PROJECT,
  SET_PROJECT_MEMBERS,
  SET_TODOS,
  SET_TODO,
  REMOVE_TODO,
  SET_CHAT_TOXICITY,
  SET_CHAT_TOXICITIES,
  REMOVE_CHAT_TOXICITY,
} from "../type";

const initState = {
  projects: null,
  project: null,
  members: null,
  todos: null,
  todo: null,
  chatToxicities: null,
  chatToxicity: null,
  selectedProject: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case SET_TODO:
      return {
        ...state,
        todo: action.payload,
      };
    case REMOVE_TODO:
      return {
        ...state,
        todo: null,
      };
    case SET_CURRENT_PROJECT:
      return {
        ...state,
        selectedProject: action.payload,
      };
    case SET_PROJECT_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    case SET_PROJECT_MEMBERS:
      return {
        ...state,
        members: action.payload,
      };
    case SET_CHAT_TOXICITY:
      return {
        ...state,
        chatToxicity: action.payload,
      };
    case REMOVE_CHAT_TOXICITY:
      return {
        ...state,
        chatToxicity: null,
      };
    case SET_CHAT_TOXICITIES:
      return {
        ...state,
        chatToxicities: action.payload,
      };
    default:
      return state;
  }
}
