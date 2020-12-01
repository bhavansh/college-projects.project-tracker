import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Screens/Landing";
import "./css/main.css";
import "./css/css/mycss.min.css";
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./redux/store";
import { logout, getLoggedInUserData } from "./redux/actions/userActions";
import axios from "axios";
import SignIn from "./components/Auth/SignIn";
import Alert from "./components/helpers/Alert";
import PersonalInfo from "./components/Auth/PersonalInfo";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/helpers/PrivateRoute";
import { SET_AUTHENTICATED, SET_CURRENT_PROJECT } from "./redux/type";
import AuthRoute from "./components/helpers/AuthRoute";
import "./firebase/firebaseSetup";
import { getAllProjectMembers } from "./redux/actions/dataActions";
import Todos from "./components/Todo/Todos";
import AddTodo from "./components/Todo/AddTodo";
import UpdateTodo from "./components/Todo/UpdateTodo";
import Chat from "./components/Chat/Chat";
import Profile from "./components/User/Profile";
import SearchUser from "./components/User/SearchUser";
import EditUser from "./components/User/EditUser";
import EditProject from "./components/Project/EditProject";
import AddProject from "./components/Project/AddProject";
import SingleProject from "./components/Project/SingleProject";
import Projects from "./components/Project/Projects";

const token = localStorage.getItem("pt-token");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
  } else {
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getLoggedInUserData());
  }
}
const selectedProject = localStorage.getItem("selectedProject");
const loggedInUserId = store.getState().user.credentials["_id"];

// if (selectedProject && loggedInUserId === selectedProject.admin) {
if (selectedProject) {
  store.dispatch({
    type: SET_CURRENT_PROJECT,
    payload: JSON.parse(selectedProject),
  });
  store.dispatch(
    getAllProjectMembers(JSON.parse(selectedProject)["_id"].toString())
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App font-body">
        <Router>
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <AuthRoute exact path="/signin" component={SignIn} />
            <Route exact path="/personal-info" component={PersonalInfo} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile/:userId" component={Profile} />
            <PrivateRoute exact path="/search" component={SearchUser} />
            <PrivateRoute exact path="/projects" component={Projects} />
            <PrivateRoute exact path="/add-project" component={AddProject} />
            <PrivateRoute
              exact
              path="/project/:projectId"
              component={SingleProject}
            />
            <PrivateRoute
              exact
              path="/edit-user/:userId"
              component={EditUser}
            />
            <PrivateRoute
              exact
              path="/edit-project/:projectId"
              component={EditProject}
            />
            <PrivateRoute exact path="/chat" component={Chat} />
            <PrivateRoute exact path="/add-todo" component={AddTodo} />
            <PrivateRoute
              exact
              path="/edit-todo/:todoId"
              component={UpdateTodo}
            />
            <PrivateRoute exact path="/todos" component={Todos} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
