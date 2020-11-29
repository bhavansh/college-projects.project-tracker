import React from "react";
import { Link } from "react-router-dom";

const TodoHeader = ({ selectedProject, credentials, members, history }) => {
  return (
    <div className="header">
      <div className="left">
        <div className="project-name">
          <Link
            to={`/project/${selectedProject._id}`}
            className="text-2xl text-secondary-300 font-semibold hover:text-primary-200 transition duration-200"
          >
            {selectedProject.name}
          </Link>
          {selectedProject.admin._id === credentials._id && (
            <span
              onClick={(e) => {
                history.push({
                  pathname: `/edit-project/${selectedProject._id}`,
                  state: { project: selectedProject },
                });
              }}
              to={`/edit-project/${selectedProject._id}`}
              className="ml-2 text-xs text-primary-200 hover:text-opacity-90 cursor-pointer"
            >
              Edit
            </span>
          )}
        </div>
        <div className="project-info flex mt-3">
          <div className="info-wraper text-sm text-gray-500 flex items-center mr-7">
            <i class="fas fa-bolt text-green-500 mr-2"></i>
            <span className="text-green-500">Active Project</span>
          </div>
          <div className="info-wraper text-sm text-gray-500 flex items-center">
            <i class="fas fa-user text-sm text-gray-500 mr-2"></i>
            <span>{members.length} Assignees</span>
          </div>
        </div>
      </div>
      <div className="right">
        <Link
          to="/add-todo/"
          className="add-todo-btn px-3 py-2 rounded-lg text-xs bg-primary-100 transform hover:scale-95 duration-300 focus:outline-none"
        >
          <i class="fas fa-clipboard-check mr-2"></i>
          <span>Add Todo</span>
        </Link>
      </div>
    </div>
  );
};

export default TodoHeader;
