import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducers from "../redux/reducers/userReducer";
import uiReducers from "../redux/reducers/uiReducer";
import dataReducers from "../redux/reducers/dataReducer";
import alertReducers from "../redux/reducers/alertReducer";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducers,
  data: dataReducers,
  ui: uiReducers,
  alerts: alertReducers,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
