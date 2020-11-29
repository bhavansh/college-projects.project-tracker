import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllTodosOfProject } from "../../redux/actions/dataActions";

const ProjectInfo = ({ selectedProject, getAllTodosOfProject, todos }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllTodosOfProject(selectedProject?._id);
    if (todos) {
      setLoading(false);
    }
  }, [todos?.allTodos?.length]);
  return (
    <div className="project-info">
      <div className="top border-2 border-gray-200 rounded-xl">
        <img
          src={selectedProject?.bannerPhoto}
          alt=""
          className=" rounded-t-xl"
        />
        <Link to={`/project/${selectedProject._id}`}>
          <h1 className="flex items-center text-secondary-300 font-medium text-lg mt-4 transition duration-200 ease-out hover:text-primary-200">
            {selectedProject?.name}{" "}
            <i className="fas fa-external-link-alt text-xs ml-1"></i>
          </h1>
        </Link>
        <h1 className="text-gray-500 font-medium text-sm">
          @{selectedProject?.companyName}
        </h1>
      </div>
      <h2 className="mb-3 text-secondary-400 font-semibold text-lg mt-4 flex items-center justify-between">
        <span>Task Stats</span>
      </h2>
      <div className="bottom border-2 border-gray-200 rounded-xl">
        <div className="icons">
          <div className="info-grp info-grp-1 flex justify-start items-center rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-5 w-5"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <div className="text">
              <h1 className="text-lg font-semibold">
                {todos?.allTodos?.length === 0 ? 0 : todos?.allTodos?.length}
              </h1>
              <h5>Total</h5>
            </div>
          </div>
          <div className="info-grp info-grp-2 flex justify-start items-center rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="mr-2 h-5 w-5"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <div className="text">
              <h1 className="text-lg font-semibold">
                {todos?.completedTodos?.length === 0
                  ? 0
                  : todos?.completedTodos?.length}
              </h1>
              <h5>Completed</h5>
            </div>
          </div>
          <div className="info-grp info-grp-3 flex justify-start items-center rounded-md">
            <i class="fas fa-stopwatch mr-2"></i>
            <div className="text">
              <h1 className="text-lg font-semibold">
                {todos?.inProgressTodos?.length == 0
                  ? 0
                  : todos?.inProgressTodos?.length}
              </h1>
              <h5>Doing</h5>
            </div>
          </div>
          <div className="info-grp info-grp-4 flex justify-start items-center rounded-md">
            <i class="fas fa-radiation-alt mr-2"></i>
            <div className="text">
              <h1 className="text-lg font-semibold">
                {todos?.backlogedTodos?.length == 0
                  ? 0
                  : todos?.backlogedTodos?.length}
              </h1>
              <h5>Backlogs</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatesToProps = (state) => ({
  todos: state.data.todos,
});
export default connect(mapStatesToProps, { getAllTodosOfProject })(ProjectInfo);
