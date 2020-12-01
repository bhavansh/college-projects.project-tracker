import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAllUsers } from "../../redux/actions/userActions";
import Fuse from "fuse.js";
import { connect } from "react-redux";
import { HashLoader } from "react-spinners";

const SearchUser = ({ users, getAllUsers, history }) => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState(null);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllUsers();
    if (users) {
      setFuse(
        new Fuse(users, {
          keys: ["name", "username", "email", "institution", "githubLink"],
          includeScore: true,
        })
      );

      setLoading(false);
    }
  }, [users?.length]);

  // Search Result template
  const ResultUser = ({ user }) => {
    return (
      <div className="search-user px-5 hover:bg-bg-200">
        <div className="border-b-2 flex items-center justify-start border-gray-100 w-full p-3">
          <div className="left">
            <div className="flex items-center justify-start">
              <img
                src={user?.profilePhoto}
                alt=""
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="user-info ml-5">
                <h2
                  onClick={(e) => {
                    history.push({ pathname: `/profile/${user?._id}` });
                  }}
                  className="text-secondary-300 font-medium hover:text-primary-100 transition ease-out duration-200 cursor-pointer"
                >
                  {user?.name}
                </h2>
                <h2 className="text-secondary-100 text-sm">
                  @{user?.username}
                </h2>
              </div>
            </div>
          </div>
          <div className="middle flex items-center justify-center">
            <div className="icon-grp flex items-center  mx-2">
              <i class="fas fa-briefcase  text-primary-200"></i>
              <span className="text-sm text-gray-500 ml-2">
                {user?.institution.length > 10
                  ? `${user?.institution.substring(0, 10)}...`
                  : user?.institution}
              </span>
            </div>
            <div className="icon-grp flex items-center mx-2">
              <i class="fas fa-envelope text-primary-200"></i>
              <a
                className="text-sm  text-gray-500 ml-2"
                href={`mailto:${user?.email}`}
              >
                {user?.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BackButton = () => {
    return (
      <div
        className="search-icon mx-5 h-12 w-12 flex items-center justify-center rounded-full cursor-pointer hover:text-primary-100 hover:bg-bg-300"
        onClick={() => {
          history.go(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
            className="h-3 w-3"
          />
        </svg>
      </div>
    );
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setLoading(true);
    setSearchValue(value);
    setResults(fuse.search(value));
    setLoading(false);
  };

  const getSearchBar = () => {
    return (
      <div className="search-bar flex items-center justify-start border-b-2 border-primary-100">
        <BackButton />
        <input
          type="text"
          name="searchvalue"
          id="searchvalue"
          className="p-4 w-full outline-none"
          placeholder="Search any user with name, username, email, institution or github."
          value={searchValue}
          onChange={handleChange}
        />
        <div
          className="close h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-bg-200 mr-3"
          onClick={(e) => {
            setSearchValue("");
            setResults(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6 "
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
              className="h-4 w-4 mr-3 text-gray-500"
            />
          </svg>
        </div>
      </div>
    );
  };
  return (
    <div>
      {loading ? (
        <div
          className="flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          <HashLoader size={50} color={"#ff6f3c"} />
        </div>
      ) : (
        <div className="bottom">
          <div className="">{getSearchBar()}</div>
          {results && (
            <div className="header">
              {results?.length === 0 ? null : (
                <h1 className="my-5 px-5 text-gray-400">Search Results</h1>
              )}
              <div className="results">
                {results?.length === 0 ? (
                  <div
                    className="flex justify-center items-center w-screen mx-auto "
                    style={{ height: "80vh" }}
                  >
                    <h1 className="text-xl font-medium text-gray-500">
                      No users found.
                    </h1>
                  </div>
                ) : (
                  results.map((result, index) => (
                    <ResultUser user={result.item} key={index} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

SearchUser.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => ({
  users: state.user.users,
  credentials: state.user.credentials,
  selectedProject: state.data.selectedProject,
});
export default connect(mapStatesToProps, {
  getAllUsers,
})(SearchUser);
