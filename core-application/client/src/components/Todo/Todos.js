import React, { useEffect, useState } from "react";
import DashNavbar from "./../Dashboard/DashNavbar";
import { connect } from "react-redux";
import {
  getAllTodosOfProject,
  removeATodoFromRedux,
  deleteATodo,
} from "./../../redux/actions/dataActions";
import { HashLoader } from "react-spinners";
import TodoHeader from "./TodoHeader";
import TodoContainer from "./TodoContainer";

const Todos = ({
  getAllTodosOfProject,
  removeATodoFromRedux,
  credentials,
  selectedProject,
  deleteATodo,
  members,
  todos,
  history,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    removeATodoFromRedux();
    if (selectedProject) {
      getAllTodosOfProject(selectedProject?._id);
    }
    if (todos) {
      setLoading(false);
    }
  }, [getAllTodosOfProject, selectedProject?._id, todos?.allTodos?.length]);

  return (
    <div id="todo-feature">
      <DashNavbar history={history} />
      {!selectedProject ? (
        <div
          className="flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          None Project selected.
        </div>
      ) : loading ? (
        <div
          className="flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          <HashLoader size={50} color={"#ff6f3c"} />
        </div>
      ) : (
        <div className="todo-kanban">
          <TodoHeader
            credentials={credentials}
            members={members}
            selectedProject={selectedProject}
            history={history}
          />
          <div className="middle-section">
            <h1 className="text-secondary-300 font-medium">All Tasks</h1>
            <div className="all-tasks-wrapper">
              <TodoContainer
                todos={todos?.justAddedTodos}
                title={"TO DO"}
                h1Color={"purple"}
                history={history}
                deleteATodo={deleteATodo}
              />
              <TodoContainer
                todos={todos?.inProgressTodos}
                title={"IN PROGRESS"}
                h1Color={"blue"}
                history={history}
                deleteATodo={deleteATodo}
              />
              <TodoContainer
                todos={todos?.completedTodos}
                title={"COMPLETED"}
                h1Color={"green"}
                history={history}
                deleteATodo={deleteATodo}
              />
              <TodoContainer
                todos={todos?.backlogedTodos}
                title={"BACKLOGED"}
                h1Color={"red"}
                history={history}
                deleteATodo={deleteATodo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStatesToProps = (state) => ({
  selectedProject: state.data.selectedProject,
  members: state.data.members,
  todos: state.data.todos,
  credentials: state.user.credentials,
});

export default connect(mapStatesToProps, {
  removeATodoFromRedux,
  getAllTodosOfProject,
  deleteATodo,
})(Todos);
