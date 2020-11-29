import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";
import Loader from "../helpers/Loader";
import { clearErrors } from "../../redux/actions/uiActions";

const PersonalInfo = ({
  ui,
  clearErrors,
  updateUser,
  history,
  location: {
    state: { userInfo },
  },
}) => {
  useEffect(() => {
    clearErrors();
  }, []);

  const [userData, setUserData] = useState({
    username: userInfo.username,
    githubLink: userInfo.githubLink,
    institution: userInfo.institution,
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitPersonalInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    updateUser(userData, userInfo._id, history);
    setLoading(false);
  };

  return (
    <div className="mt-10 sm:mt-0 h-screen bg-bg-100">
      <div className=" md:grid md:grid-cols-3 md:gap-6  h-screen mx-auto  my-personal-form">
        <div className="mt-5 md:mt-0 md:col-span-2 flex flex-col ">
          <div className="my-5">
            <h2 className="text-5xl font-semibold">Personal Info</h2>
          </div>
          <form>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      name="username"
                      type="text"
                      id="username"
                      value={userData.username}
                      placeholder="ex. project-tracker"
                      onChange={handleChange}
                      className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                    />
                    <small className="mt-1 text-red-500">
                      {ui?.errors?.username}
                    </small>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="institution"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Institution
                    </label>
                    <input
                      name="institution"
                      type="text"
                      placeholder="ex. Facebook, Harvard"
                      value={userData.institution}
                      id="institution"
                      onChange={handleChange}
                      className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                    />
                    <small className="mt-1 text-red-500">
                      {ui?.errors?.institution}
                    </small>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="githubLink"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Github Link
                    </label>
                    <input
                      name="githubLink"
                      type="text"
                      id="githubLink"
                      value={userData.githubLink}
                      placeholder="https://github.com/ ..."
                      className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                      onChange={handleChange}
                    />
                    <small className="mt-1 text-red-500">
                      {ui?.errors?.githubLink}
                    </small>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-4">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={submitPersonalInfo}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-100"
                  >
                    {isLoading ? (
                      <span className="mx-3">
                        <Loader isloading={isLoading} color={"#000"} />
                      </span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PersonalInfo.propTypes = {
  ui: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => ({
  ui: state.ui,
});

export default connect(mapStatesToProps, { updateUser, clearErrors })(
  PersonalInfo
);
