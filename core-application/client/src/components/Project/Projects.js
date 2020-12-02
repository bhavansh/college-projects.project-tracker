import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getAllProjectsForAUser,
  selectACurrentProject,
  getAllProjectMembers,
} from "../../redux/actions/dataActions";
import DashNavbar from "../Dashboard/DashNavbar";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Projects = ({
  getAllProjectsForAUser,
  getAllProjectMembers,
  selectACurrentProject,
  projects,
  selectedProject,
  history,
  user: {
    credentials: { _id },
  },
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllProjectsForAUser();
    if (projects !== null) setLoading(false);
  }, [getAllProjectsForAUser]);

  const isAdmin = (adminId, userId) => {
    return adminId === userId;
  };

  const getMembersPhotos = (members) => {
    return members?.length === 0 ? (
      "No members added."
    ) : (
      <div className="flex -space-x-2 overflow-hidden">
        {members?.map((member, index) => (
          <img
            key={index}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={member?.memberId?.profilePhoto}
            alt=""
          />
        ))}
      </div>
    );
  };

  const selectAProject = (project) => {
    localStorage.setItem("selectedProject", JSON.stringify(project));
    selectACurrentProject(project);
    getAllProjectMembers(project?._id);
  };

  const getRow = (project, index) => {
    return (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap ">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={project?.bannerPhoto}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div
                className="text-sm font-medium text-gray-900 hover:text-primary-100 cursor-pointer"
                onClick={() => {
                  history.push(`/project/${project?._id}`);
                }}
              >
                {project?.name}
              </div>
              <a
                href={project?.website}
                target="_blank"
                className="text-xs text-gray-500 hover:text-primary-200 transition ease-out duration-400"
              >
                {project?.website}
              </a>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{project?.companyName}</div>
          {/* <div className="text-sm text-gray-500">Optimization</div> */}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={project?.admin?.profilePhoto}
            alt=""
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {getMembersPhotos(project?.members)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {new Date().toISOString() > project?.deadline ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Dead
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          {isAdmin(project?.admin?._id, _id) ? (
            <>
              <span
                onClick={() => {
                  history.push({
                    pathname: `/edit-project/${project?._id}`,
                    state: { project },
                  });
                }}
                className="text-primary-200  hover:text-secondary-200 cursor-pointer"
              >
                Edit
              </span>
              <span className="text-primary-200 ">/</span>
            </>
          ) : null}
          <span
            className={`${
              selectedProject?._id === project?._id
                ? "text-secondary-200"
                : "text-primary-200"
            }   hover:text-secondary-200 cursor-pointer`}
            onClick={() => {
              selectAProject(project);
            }}
          >
            {selectedProject?._id === project?._id ? "Selected" : "Select"}
          </span>
        </td>
      </tr>
    );
  };
  return (
    <div id="project-wrapper">
      <DashNavbar />
      <Link
        to="/add-project"
        className="add-projects bg-green-500 py-2 px-3 rounded-full "
      >
        <i className="fas fa-clipboard-check text-xs mr-2"></i>
        <h1 className="text-xs">Add Project</h1>
      </Link>
      {loading && projects === null ? (
        <div
          className="flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          <HashLoader size={50} color={"#ff6f3c"} />
        </div>
      ) : projects?.length === 0 ? (
        <div className="h-80 flex justify-center items-end">
          <span>No projects added yet.</span>
        </div>
      ) : (
        <div id="projects" className="bg-bg-50">
          <div className="flex flex-col">
            <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <h1 className="text-xl text-secondary-400 font-semibold my-5 px-8">
                  ALL Projects
                </h1>
                <div className="shadow-md overflow-hidden border-b border-gray-200 sm:rounded-lg my-table">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Company Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Admin
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Members
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {projects?.map((project, index) =>
                        getRow(project, index)
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Projects.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  projects: state.data.projects,
  selectedProject: state.data.selectedProject,
  user: state.user,
});

export default connect(mapStatesToProps, {
  getAllProjectsForAUser,
  selectACurrentProject,
  getAllProjectMembers,
})(Projects);
