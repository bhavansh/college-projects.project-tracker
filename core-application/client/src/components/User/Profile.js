import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import DashNavbar from "../Dashboard/DashNavbar";
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/userActions";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import moment from "moment";
import { joinOrRomoveUserfromProject } from "../../redux/actions/dataActions";

const Profile = ({
  match: {
    params: { userId },
  },
  joinOrRomoveUserfromProject,
  getUserData,
  user,
  selectedProject,
  credentials,
  history,
}) => {
  const initialiseIsAddedToProject = () => {
    const isAdded = selectedProject?.members.find(
      (member) => member.memberId._id === userId
    );
    if (isAdded) return true;
    else return false;
  };

  const [userData, setUserData] = useState(credentials);
  const [loading, setLoading] = useState(false);
  const [isAddedToProject, setIsAddedToProject] = useState(
    initialiseIsAddedToProject()
  );

  useEffect(() => {
    setLoading(true);
    getUserData(userId);
    setUserData(user);
    if (user !== null) {
      setLoading(false);
    }
  }, [user?._id, userId]);

  const handleJoinORRemoveProject = () => {
    setIsAddedToProject((prev) => !prev);
    if (isAddedToProject) {
      joinOrRomoveUserfromProject(
        selectedProject._id,
        userId,
        "remove",
        history
      );
    } else {
      joinOrRomoveUserfromProject(selectedProject._id, userId, "join", history);
    }
  };
  return (
    <div>
      <DashNavbar />
      {loading ? (
        <div
          className="flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          <HashLoader size={50} color={"#ff6f3c"} />
        </div>
      ) : (
        <div id="profile">
          <div className="container-section wrapper">
            <div className="left">
              <h1 className="text-4xl font-bold mb-3">
                Hey! I'm {userData?.name}
              </h1>
              <div className="rounded py-1 bg-primary-100 w-1/6"></div>
              <div className="img-div">
                <svg
                  className="block h-48 w-48 my-svg"
                  viewBox="0 0 184 184"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M182 184a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 80a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM22 144a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM2 144a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM2 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                    fill="#374151"
                    fillRule="evenodd"
                    opacity=".903"
                  ></path>
                </svg>
                <img
                  src={userData?.profilePhoto}
                  alt=""
                  className="rounded-full shadow-xl"
                />
              </div>
              <div className="action-btns flex justify-start items-end ">
                {credentials?._id === userId && (
                  <button
                    onClick={() => {
                      history.push({
                        pathname: `/edit-user/${userData?._id}`,
                        state: { userInfo: userData },
                      });
                    }}
                    className="edit-btn bg-primary-100 text-xs rounded-full py-2 px-4  transition duration-200 ease-out transform focus:outline-none hover:scale-95"
                  >
                    Edit Profile
                  </button>
                )}
                {selectedProject &&
                  selectedProject?.admin?._id === credentials?._id && (
                    <button
                      onClick={handleJoinORRemoveProject}
                      className="ml-2 bg-white border-2 border-primary-100 text-xs rounded-full py-2 px-4  transition duration-200 ease-out transform focus:outline-none hover:scale-95"
                    >
                      {isAddedToProject ? "Remove from" : "Add to"}{" "}
                      {selectedProject?.name.length > 15
                        ? `${selectedProject?.name.substring(0, 15)}...`
                        : selectedProject?.name}
                    </button>
                  )}
              </div>
            </div>
            <div className="right">
              <div className="personal-info">
                <h1 className="font-semibold text-secondary-400">
                  Personal Information
                </h1>
                <div className="info-wrapper">
                  <div className="title font-medium text-secondary-300 flex items-center">
                    <i className="far fa-user mr-2 text-primary-100"></i>
                    <h2>Username</h2>
                  </div>
                  <h3 className="text-xs text-gray-600">
                    {userData?.username}
                  </h3>
                </div>
                <div className="info-wrapper">
                  <div className="title font-medium text-secondary-300 flex items-center">
                    <i className="far fa-envelope mr-2 text-primary-100"></i>
                    <h2>Email</h2>
                  </div>
                  <a href={`mailto:${userData?.email}`}>
                    <h3 className="text-xs text-gray-600 underline cursor-pointer">
                      {userData?.email}
                    </h3>
                  </a>
                </div>
                {userData?.githubLink && (
                  <div className="info-wrapper">
                    <div className="title font-medium text-secondary-300 flex items-center">
                      <i className="fab fa-github mr-2 text-primary-100"></i>
                      <h2>Github</h2>
                    </div>
                    <a href={userData?.githubLink} target="_blank">
                      <h3 className="text-xs text-gray-600 underline">
                        {
                          userData?.githubLink.split("/")[
                            userData?.githubLink.split("/").length - 1
                          ]
                        }
                      </h3>
                    </a>
                  </div>
                )}
                <div className="info-wrapper">
                  <div className="title font-medium text-secondary-300 flex items-center">
                    <i className="fas fa-briefcase mr-2 text-primary-100"></i>
                    <h2>Institution</h2>
                  </div>
                  <h3 className="text-xs text-gray-600">
                    {userData?.institution}
                  </h3>
                </div>
                <div className="info-wrapper">
                  <div className="title font-medium text-secondary-300 flex items-center">
                    <i className="far fa-clock mr-2 text-primary-100"></i>
                    <h2>Joined At</h2>
                  </div>
                  <h3 className="text-xs text-gray-600">
                    {moment(userData?.createdAt).format("DD-MM-YYYY")}
                  </h3>
                </div>
              </div>
              <div className="project-info border-t-2 my-4 border-gray-200">
                <h1 className="font-semibold mt-4 text-secondary-400">
                  Project Information
                </h1>
                <div className="project-wrapper">
                  <div className="title font-medium text-secondary-300 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="mr-1 text-primary-100 h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        className="mr-1 text-primary-100 h-5 w-5"
                      />
                    </svg>
                    <h2>Projects</h2>
                  </div>
                  <div className="projects">
                    {userData?.projects?.length === 0 ? (
                      <h1 className="text-sm py-3 flex justify-center items-center">
                        No projects
                      </h1>
                    ) : (
                      userData?.projects?.map(
                        (project, index) =>
                          project?.projectId && (
                            <Link
                              key={index}
                              to={`/project/${project?.projectId?._id}`}
                              className="project hover:bg-primary-100 hover:bg-opacity-20 rounded"
                            >
                              <img
                                src={project?.projectId?.bannerPhoto}
                                alt=""
                                className="shadow-md h-7 w-7 rounded-full object-cover"
                              />
                              <h1 className="text-secondary-300 text-sm">
                                {project?.projectId?.name}
                              </h1>
                            </Link>
                          )
                      )
                    )}
                  </div>
                </div>
                {userData?.adminProjects?.length !== 0 && (
                  <div className="project-wrapper">
                    <div className="title font-medium text-secondary-300 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="mr-1 text-primary-100 h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          className="mr-1 text-primary-100 h-5 w-5"
                        />
                      </svg>
                      <h2>Admin</h2>
                    </div>
                    <div className="projects">
                      {userData?.adminProjects?.map(
                        (project, index) =>
                          project?.projectId && (
                            <Link
                              key={index}
                              to={`/project/${project?.projectId?._id}`}
                              className="project hover:bg-primary-100 hover:bg-opacity-20 rounded"
                            >
                              <img
                                src={project?.projectId?.bannerPhoto}
                                alt=""
                                className="shadow-md h-7 w-7 rounded-full object-cover"
                              />
                              <h1 className="text-secondary-300 text-sm">
                                {project?.projectId?.name}
                              </h1>
                            </Link>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  credentials: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  credentials: state.user.credentials,
  selectedProject: state.data.selectedProject,
  user: state.user.user,
});
export default connect(mapStatesToProps, {
  getUserData,
  joinOrRomoveUserfromProject,
})(Profile);
