import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { HashLoader } from "react-spinners";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  getAProject,
  removeToxicity,
  getAllTodosOfProject,
  getAllProjectMembers,
  joinOrRomoveUserfromProject,
  getAllMembersToxicity,
} from "../../redux/actions/dataActions";

const SingleProject = ({
  match: { params },
  getAProject,
  getAllTodosOfProject,
  joinOrRomoveUserfromProject,
  removeToxicity,
  getAllProjectMembers,
  getAllMembersToxicity,
  project,
  members,
  credentials,
  history,
  todos,
  chatToxicities,
}) => {
  const [loading, setLoading] = useState(false);

  const isUserMember = (userId) => {
    const isAdded = members?.find((member) => member.memberId._id === userId);
    if (isAdded !== undefined) return true;
    else return false;
  };

  const handleJoinORRemoveProject = (userId) => {
    if (isUserMember(userId)) {
      joinOrRomoveUserfromProject(params.projectId, userId, "remove", history);
    } else {
      joinOrRomoveUserfromProject(params.projectId, userId, "join", history);
    }
  };
  useEffect(() => {
    setLoading(true);
    getAProject(params.projectId);
    getAllTodosOfProject(params.projectId);
    getAllProjectMembers(params?.projectId);
    getAllMembersToxicity(params?.projectId);
    removeToxicity();
    if (project && todos && chatToxicities) {
      setLoading(false);
    }
  }, [project?._id, todos?.allTodos?.length, chatToxicities?.count]);

  const getToxicMessages = (userId) => {
    return chatToxicities?.chatToxicities.filter(
      (chat) => chat?.user?._id === userId
    );
  };

  return (
    <div id="project-info">
      {loading ? (
        <div
          className=" flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          <HashLoader size={50} color={"#ff6f3c"} />
        </div>
      ) : (
        <div className="project-wrapper flex items-center justify-center">
          <div className="project-card rounded-lg bg-white">
            <div className="header">
              {project?.bannerPhoto && (
                <div className="banner-img">
                  <img src={project?.bannerPhoto} alt="" className="" />
                </div>
              )}
            </div>
            <div className="title my-5 flex items-center justify-between px-5">
              <div className="title-text">
                <h1 className="text-3xl text-secondary-100 font-semibold ">
                  {project?.name}
                </h1>
                <div className="rounded py-1 bg-primary-100 w-2/6 mt-1"></div>
              </div>
              {credentials?._id === project?.admin?._id && (
                <h1
                  className="text-primary-300 font-semibold  cursor-pointer transition hover:text-primary-100 duration-200"
                  onClick={(e) => {
                    history.push({
                      pathname: `/edit-project/${project?._id}`,
                      state: { project },
                    });
                  }}
                >
                  Edit
                </h1>
              )}
            </div>
            <div className="description my-5 px-5">
              <h1 className="text-lg text-secondary-100 font-medium">
                Description
              </h1>
              <p className="text-sm text-gray-400  px-5">
                {project?.description}
              </p>
            </div>
            <div className="project-info my-5 px-5">
              <div className="info flex items-center justify-evenly">
                <div className="info-wrapper text-gray-400">
                  <i className="fas  fa-briefcase text-green-500"></i>
                  <h1>{project?.companyName}</h1>
                </div>
                {project?.website && (
                  <div className="info-wrapper text-gray-400">
                    <i className="fas  fa-globe-americas text-green-500"></i>
                    <a
                      href={project?.website}
                      target="_blank"
                      rel="noreferrer"
                      className="transition duration-200 text-sm  hover:text-gray-300 "
                    >
                      {project?.name}
                    </a>
                  </div>
                )}
                {project?.githubRepoLink && (
                  <div className="info-wrapper text-gray-400">
                    <i className="fas  fa-globe-americas text-green-500"></i>
                    <a
                      href={project?.githubRepoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="transition duration-200 text-sm  hover:text-gray-300 "
                    >
                      {
                        project?.githubRepoLink?.split("/")[
                          project?.githubRepoLink?.split("/").length - 1
                        ]
                      }
                    </a>
                  </div>
                )}
              </div>
            </div>
            {project?.concept && (
              <div className="description my-5 px-5">
                <h1 className="text-lg text-secondary-100 font-medium">
                  Concept
                </h1>
                <p className="text-sm text-gray-400  px-5">
                  {project?.concept}
                </p>
              </div>
            )}
            {todos?.allTodos?.length !== 0 && (
              <div className="stats my-5 px-5">
                <h2 className="mb-3 text-lg text-secondary-100 font-medium">
                  <span>Task Stats</span>
                </h2>
                <div className="rounded-xl">
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
                          {todos?.allTodos?.length}
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
                          {todos?.completedTodos?.length}
                        </h1>
                        <h5>Completed</h5>
                      </div>
                    </div>
                    <div className="info-grp info-grp-3 flex justify-start items-center rounded-md">
                      <i className="fas fa-stopwatch mr-2"></i>
                      <div className="text">
                        <h1 className="text-lg font-semibold">
                          {todos?.inProgressTodos?.length}
                        </h1>
                        <h5>Doing</h5>
                      </div>
                    </div>
                    <div className="info-grp info-grp-4 flex justify-start items-center rounded-md">
                      <i className="fas fa-radiation-alt mr-2"></i>
                      <div className="text">
                        <h1 className="text-lg font-semibold">
                          {todos?.backlogedTodos?.length}
                        </h1>
                        <h5>Backlogs</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="admin my-5 px-5">
              <h1 className="text-lg text-secondary-100 font-medium">Admin</h1>
              <div className="user-info shadow">
                <div className="left">
                  <img
                    src={project?.admin?.profilePhoto}
                    alt=""
                    className="rounded-full"
                  />
                  <h1
                    className="text-gray-400 text-sm ml-4"
                    onClick={(e) => {
                      history.push({
                        pathname: `/profile/${project?.admin?._id}`,
                      });
                    }}
                  >
                    {project?.admin?.name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="members my-5 px-5">
              <h1 className="text-lg text-secondary-100 font-medium">
                Members
              </h1>
              {project?.members?.map((member, index) => (
                <div className="user-info shadow" key={index}>
                  <div className="left">
                    <img
                      src={member?.memberId?.profilePhoto}
                      alt=""
                      className="rounded-full"
                    />
                    <h1
                      className="text-gray-400 text-sm ml-4"
                      onClick={(e) => {
                        history.push({
                          pathname: `/profile/${member?.memberId?._id}`,
                        });
                      }}
                    >
                      {member?.memberId?.name}
                    </h1>
                  </div>
                  <div className="actions">
                    {credentials?._id === project?.admin?._id &&
                      member?.memberId?._id !== project?.admin?._id && (
                        <button
                          onClick={(e) =>
                            handleJoinORRemoveProject(member?.memberId?._id)
                          }
                          className="ml-2 bg-white border-2 border-primary-100 text-xs rounded-full py-2 px-4  transition duration-200 ease-out transform focus:outline-none hover:scale-95"
                        >
                          {isUserMember(member?.memberId?._id)
                            ? "Remove from"
                            : "Add to"}{" "}
                          {project?.name.length > 15
                            ? `${project?.name.substring(0, 15)}...`
                            : project?.name}
                        </button>
                      )}
                    {/* {credentials?._id === project?.admin?._id &&
                      member?.memberId?._id !== project?.admin?._id && ( */}
                    <>
                      <Link
                        to={`/toxic-chats/${project?._id}/${member?.memberId?._id}`}
                        className="ml-3 ban-button py-2 px-4 bg-secondary-200 text-primary-100 rounded-full shadow-md text-xs transition duration-200 transform hover:scale-95"
                      >
                        <i className="fas fa-exclamation-triangle mr-2"></i>
                        <span>
                          {getToxicMessages(member?.memberId?._id).length} Chats
                        </span>
                      </Link>
                      <button className="ml-3 ban-button py-2 px-4 bg-primary-100 rounded-full shadow-md text-xs transition duration-200 transform hover:scale-95">
                        <i className="fas fa-user-slash mr-2"></i>
                        <span>Ban</span>
                      </button>
                    </>
                    {/* )} */}
                  </div>
                </div>
              ))}
            </div>
            {project?.usefulLinks?.length !== 0 && (
              <div className="useful-links my-5 mt-7 px-5">
                <h1 className="text-lg text-secondary-100 font-medium">
                  Useful Links
                </h1>
                {
                  <div className="useful-links-card">
                    {project?.usefulLinks?.map((link, index) => (
                      <div className="link py-2 px-5" key={index}>
                        <a
                          href={link?.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-600 text-sm"
                        >
                          <span>
                            <i className="far fa-dot-circle text-primary-300 mr-3"></i>
                          </span>
                          <span>{link?.title}</span>
                          <span>
                            <i className="fas fa-external-link-alt ml-3 text-xs"></i>
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>
                }
              </div>
            )}
            <div className="deadline">
              <div className="info-wrapper">
                <i className="fas fa-stopwatch text-red-500 text-xl mr-2"></i>
                <h1 className="text-red-500 text-xs">
                  {moment(project?.deadline).format("DD MMM YY")}
                </h1>
              </div>
              <div className="info-wrapper">
                <i className="fas fa-history text-green-500 text-xl mr-2"></i>
                <h1 className="text-green-500 text-xs">
                  {moment(project?.createdAt).format("DD MMM YY")}
                </h1>
              </div>
              <div className="info-wrapper">
                <h6 className="text-gray-400 text-xs">Last Updated</h6>
                <h1 className="text-gray-400 text-xs ml-2">
                  {moment(project?.updatedat).format("DD MMM YY")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStatesToProps = (state) => ({
  credentials: state.user.credentials,
  project: state.data.project,
  chatToxicities: state.data.chatToxicities,
  members: state.data.members,
  todos: state.data.todos,
});

export default connect(mapStatesToProps, {
  getAProject,
  getAllTodosOfProject,
  joinOrRomoveUserfromProject,
  getAllProjectMembers,
  getAllMembersToxicity,
  removeToxicity,
})(SingleProject);
