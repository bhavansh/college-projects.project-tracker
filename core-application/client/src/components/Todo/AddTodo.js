import React, { useEffect } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/uiActions";
import { createTodo } from "./../../redux/actions/dataActions";
import Loader from "./../helpers/Loader";
import { useState } from "react";
import Calender from "./../helpers/Calender";
import AddMembers from "./AddMembers";
import AddTag from "./AddTag";

const AddTodo = ({ selectedProject, members, createTodo, ui, history }) => {
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const [todoData, setTodoData] = useState({
    heading: "",
    description: "",
    deadline: "",
    tags: [],
    assignedMembers: [],
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitProjectInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    createTodo(
      {
        ...todoData,
      },
      selectedProject._id,
      history
    );
    setLoading(false);
  };

  return (
    <div id="add-project" className="bg-bg-50">
      <div className="container-section">
        <div className="header">
          <h1 className="text-secondary-300 text-6xl font-semibold">
            Add new todo
          </h1>
        </div>
        <div className="mt-3 sm:mt-0 h-screen mx-auto mb-40">
          <div className=" md:grid md:grid-cols-3 md:gap-6  h-screen mx-auto  my-project-form">
            <div className="mt-5 md:mt-0 md:col-span-2 flex flex-col">
              <form>
                <div className="shadow-lg overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="heading"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          name="heading"
                          type="text"
                          id="heading"
                          value={todoData.heading}
                          placeholder="ex. fix bugs in backend"
                          onChange={handleChange}
                          className="mt-1 border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none block w-full sm:text-sm  rounded-md"
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.heading}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="tags"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tags
                        </label>
                        <AddTag setTodoData={setTodoData} defaultValue={null} />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.tags}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            rows="3"
                            name="description"
                            value={todoData.description}
                            onChange={handleChange}
                            className="shadow-sm border-2 border-grey-50 p-2 focus:border-transparent focus:ring-2 focus:ring-primary-100 focus:outline-none mt-1 block w-full sm:text-sm  rounded-md"
                            placeholder="Add description of task..."
                          ></textarea>
                        </div>
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.description}
                        </small>
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="members"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Assign to members
                        </label>
                        <AddMembers
                          members={members}
                          setTodoData={setTodoData}
                          defaultValue={null}
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.assignedMembers}
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
                          setProjectInfo={setTodoData}
                          initialDay={""}
                        />
                        <small className="mt-1 text-red-500">
                          {ui?.errors?.deadline}
                        </small>
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

const mapStatesToProps = (state) => ({
  ui: state.ui,
  selectedProject: state.data.selectedProject,
  members: state.data.members,
});

export default connect(mapStatesToProps, { createTodo, clearErrors })(AddTodo);
