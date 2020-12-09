import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/uiActions";
import Loader from "../helpers/Loader";
import Calender from "../helpers/Calender";
import { createProject } from "../../redux/actions/dataActions";
import CloseIcon from "../helpers/CloseIcon";
import AddIcon from "../helpers/AddIcon";

const AddProject = ({ ui, clearErrors, createProject, history }) => {
  const [tempUsefulLink, setTempUsefulLink] = useState([
    { title: "", link: "" },
  ]);

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const [projectData, setProjectData] = useState({
    name: "",
    companyName: "",
    description: "",
    concept: "",
    bannerPhoto: "",
    website: "",
    githubRepoLink: "",
    deadline: "",
    usefulLinks: [],
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "usefulLinksString") {
      setProjectData((prev) => ({
        ...prev,
        usefulLinks: value.split(","),
        usefulLinksString: value,
      }));
    } else if (name === "deadline") {
      setProjectData((prev) => ({
        ...prev,
        deadline: value.toString(),
      }));
    } else {
      setProjectData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitProjectInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    createProject(
      {
        ...projectData,
        usefulLinks: tempUsefulLink,
        bannerPhoto:
          projectData.bannerPhoto !== ""
            ? projectData.bannerPhoto
            : "https://raw.githubusercontent.com/saurabh-619/images/63d1e205dfb8898c2cd32ceef2d035b535872561/project%20tracker/Logo%208.svg",
      },
      history
    );
    setLoading(false);
  };

  const handleAddInputField = () => {
    setTempUsefulLink((prev) => [...prev, { title: "", link: "" }]);
  };

  const handleRemoveInputField = (linkIndex) => {
    setTempUsefulLink((prev) => {
      let temp = [...prev];
      temp = temp.filter((link, index) => linkIndex !== index);
      console.log(temp);
      return temp;
    });
  };

  const getUseFulLinksTemplate = () => (
    <div>
      {tempUsefulLink.map((linkObj, index) => linksTemplate(linkObj, index))}
    </div>
  );

  const handleChangeUseFulLink = (e, i) => {
    const { name, value } = e.target;
    setTempUsefulLink((prev) => {
      let temp = [...prev];
      temp[i][name] = value;
      return temp;
    });
  };
  const linksTemplate = (linkObj, index) => {
    return (
      <div key={index} className="my-usefulLink-template my-2">
        <div className="title">
          <label
            htmlFor="title"
            className="block text-xs font-medium text-gray-500"
          >
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            value={linkObj.title}
            placeholder="ex. Github, Drive, WhatsApp"
            onChange={(e) => {
              handleChangeUseFulLink(e, index);
            }}
            className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
          />
          {/* <small className="mt-1 text-red-500">{ui?.errors?.name}</small> */}
        </div>
        <div className="">
          <label
            htmlFor="link"
            className="block text-xs font-medium text-gray-500"
          >
            Company Name
          </label>
          <input
            name="link"
            type="text"
            placeholder="https://www.yourlink.com"
            value={linkObj.link}
            id="link"
            onChange={(e) => {
              handleChangeUseFulLink(e, index);
            }}
            className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
          />
          {/* <small className="mt-1 text-red-500">{ui?.errors?.link}</small> */}
        </div>
        <div className="h-7 w-6 self-end">
          <CloseIcon
            handleRemoveInputField={handleRemoveInputField}
            index={index}
          />
        </div>
      </div>
    );
  };
  return (
    <div id="add-project" className="bg-bg-50">
      <div className="container-section">
        <div className="header">
          <h1 className="text-secondary-300 text-6xl font-semibold">
            Add new project
          </h1>
        </div>
        <div className="mt-3 sm:mt-0 h-screen mx-auto mb-40">
          <div className=" md:grid md:grid-cols-3 md:gap-6  h-screen mx-auto  my-project-form">
            <div className="mt-5 md:mt-0 md:col-span-2 flex flex-col">
              <form>
                <div className="shadow-lg overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          id="name"
                          value={projectData.name}
                          placeholder="ex. project-tracker"
                          onChange={handleChange}
                          className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.name}
                        </small>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Company Name
                        </label>
                        <input
                          name="companyName"
                          type="text"
                          placeholder="ex. Facebook, Harvard"
                          value={projectData.companyName}
                          id="companyName"
                          onChange={handleChange}
                          className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.companyName}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            rows="3"
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            className="shadow-sm border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none mt-1 block w-full sm:text-sm  rounded-md"
                            placeholder="Add description about your project..."
                          ></textarea>
                        </div>
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.description}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <input
                          name="website"
                          type="text"
                          id="website"
                          placeholder="https://www.yourwebsite.com"
                          value={projectData.website}
                          className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                          onChange={handleChange}
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.website}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="bannerPhoto"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Project Banner Image url
                        </label>
                        <input
                          name="bannerPhoto"
                          type="text"
                          id="bannerPhoto"
                          placeholder="https://www.storage.com/bannerphoto.png"
                          value={projectData.bannerPhoto}
                          className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                          onChange={handleChange}
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.bannerPhoto}
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
                          name="githubRepoLink"
                          type="text"
                          id="githubRepoLink"
                          placeholder="https://github.com/ ..."
                          value={projectData.githubRepoLink}
                          className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                          onChange={handleChange}
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.githubRepoLink}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="concept"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Concept
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="concept"
                            rows="3"
                            name="concept"
                            value={projectData.concept}
                            onChange={handleChange}
                            className="shadow-sm border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none mt-1 block w-full sm:text-sm  rounded-md"
                            placeholder="Add concept of your project..."
                          ></textarea>
                        </div>
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.concept}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="deadline"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Deadline
                        </label>
                        <Calender
                          setProjectInfo={setProjectData}
                          initialDay={""}
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.deadline}
                        </small>
                      </div>

                      {/* Useful Links */}
                      <div className="col-span-6">
                        <div className="flex justify-between my-2">
                          <label
                            htmlFor="useFulLinks"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Add useful links
                          </label>
                          <AddIcon handleAddInputField={handleAddInputField} />
                        </div>
                        <div className="flex flex-col">
                          {getUseFulLinksTemplate()}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-4">
                      <button
                        type="button"
                        onClick={submitProjectInfo}
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
      </div>
    </div>
  );
};

AddProject.propTypes = {};

const mapStatesToProps = (state) => ({
  ui: state.ui,
});
export default connect(mapStatesToProps, { clearErrors, createProject })(
  AddProject
);
