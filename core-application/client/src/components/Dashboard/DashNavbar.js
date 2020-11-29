import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "./../../redux/actions/userActions";
import { connect } from "react-redux";

const DashNavbar = ({ logout, user, selectedProject }) => {
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const handleMenuClicked = (e) => {
    setIsMenuClicked((prev) => !prev);
  };
  const handleProfileClick = (e) => {
    setIsAvatarClicked((prev) => !prev);
  };

  const handleSignOut = (e) => logout();

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
                onClick={handleMenuClicked}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className={`${!isMenuClicked ? "block" : "hidden"}  h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className={`${isMenuClicked ? "block" : "hidden"}  h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl text-white font-bold">
                  {/* <img
                    className="block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  /> */}
                  Pt
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/projects"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Projects
                  </Link>
                  <Link
                    to="/chat"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Chat
                  </Link>
                  <Link
                    to="/todos"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Todos
                  </Link>
                  <Link
                    to="/search"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Search
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <span className="text-white text-sm">
                {selectedProject?.name?.length > 15
                  ? `${selectedProject?.name}...`
                  : selectedProject?.name}
              </span>

              {/*   Profile dropdown  */}
              <div className="ml-10 relative">
                <div>
                  <button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                    onClick={handleProfileClick}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.credentials?.profilePhoto}
                      alt=""
                    />
                  </button>
                </div>

                <div
                  className={`${
                    isAvatarClicked ? "block" : "hidden"
                  } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to={`/profile/${user.credentials._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={handleProfileClick}
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => {
                      handleProfileClick();
                      handleSignOut();
                    }}
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isMenuClicked ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              onClick={handleMenuClicked}
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900"
            >
              Dashboard
            </Link>
            <Link
              onClick={handleMenuClicked}
              to="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Projects
            </Link>
            <Link
              onClick={handleMenuClicked}
              to="/chat"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Chat
            </Link>
            <Link
              onClick={handleMenuClicked}
              to="/todos"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Chat
            </Link>
            <Link
              onClick={handleMenuClicked}
              to="/search"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Search
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

DashNavbar.propTypes = {};
const mapStatesToProps = (state) => ({
  user: state.user,
  selectedProject: state.data.selectedProject,
});

export default connect(mapStatesToProps, { logout })(DashNavbar);
