import React, { useState } from "react";
import moment from "moment";
import ReactModal from "react-modal";

const TodoContainer = ({ todos, title, h1Color, history, deleteATodo }) => {
  const handleDeleteTodo = (e, todoId) => {
    if (window.confirm("Are you sure?")) {
      deleteATodo(todoId, history);
    }
  };

  const [modalClicked, setModalClicked] = useState(false);

  const handleModalClicked = (e) => {
    setModalClicked((prev) => !prev);
  };
  const getStatusofTodo = (status) => {
    if (status === 0) return "TO DO";
    else if (status === 1) return "IN PROGRESS";
    else return "COMPLETED";
  };

  const modalTemplate = (todo) => {
    return (
      <ReactModal
        isOpen={modalClicked}
        contentLabel="Todo"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal flex flex-col items-start justify-center py-4 px-5">
          <div className="modal-header ml-auto ">
            <span className="text-secondary-300 font-medium">Todo</span>
            <span
              className="m-0 h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-400 hover:bg-opacity-10  cursor-pointer"
              onClick={handleModalClicked}
            >
              <i className="fas fa-times text-gray-500"></i>
            </span>
          </div>
          <div className="modal-content">
            <h1
              className={`text-${h1Color}-500 text-lg text-center font-medium`}
            >
              {todo?.heading}
            </h1>
            <h1 className={`my-5 px-3 text-gray-400 text-sm`}>
              {todo?.description}
            </h1>
            <div className="tags mt-1 mb-2">
              {todo?.tags?.map((tag, index) => (
                <div
                  className={`tag tag-${index} rounded-full py-2 px-2 mb-2`}
                  key={index}
                >
                  <h1 className="font-semibold">#{tag}</h1>
                </div>
              ))}
            </div>
            <div className="mt-3 info-section flex items-center justify-between">
              <div className="info-wrapper">
                <i
                  className={`fas fa-clipboard-check text-${h1Color}-400 text-sm mr-2`}
                ></i>
                <h1 className={`text-${h1Color}-400 text-xs`}>
                  {getStatusofTodo(todo.status)}
                </h1>
              </div>
              <div className="info-wrapper">
                <i class="fas fa-stopwatch text-gray-400 text-sm mr-2"></i>
                <h1 className="text-gray-400 text-xs">
                  {moment(todo.deadline).format("DD MMM")}
                </h1>
              </div>
              <div className="info-wrapper">
                <i class="fas fa-history text-gray-400 text-sm mr-2"></i>
                <h1 className="text-gray-400 text-xs">
                  {moment(todo.createdAt).format("DD MMM")}
                </h1>
              </div>
              <div className="info-wrapper">
                <h6 className="text-gray-400 text-xs">Last Updated</h6>
                <h1 className="text-gray-400 text-xs ml-2">
                  {moment(todo.updatedat).format("DD MMM")}
                </h1>
              </div>
            </div>
            <div className="mt-5 members">
              <h1 className="text-secondary-300 font-medium ">Creator</h1>
              <div
                className={`bg-${h1Color}-100 px-5 py-2 rounded-lg my-2 admin flex items-center justify-start`}
              >
                <img
                  src={todo.creator.profilePhoto}
                  alt=""
                  className="rounded-full mr-6"
                />
                <h1 className="text-sm text-secondary-200">
                  {todo.creator.name}
                </h1>
              </div>
              <h1 className="text-secondary-300 font-medium">Assignees</h1>
              <div className="my-2  flex flex-col items-start justify-center ">
                {todo?.assignedMembers?.map((member, index) => (
                  <div
                    className="my-2 bg-gray-100 px-5 shadow py-2 rounded-lg flex items-center justify-start w-full"
                    key={index}
                  >
                    <img
                      src={member.memberId.profilePhoto}
                      alt=""
                      key={index}
                      className="rounded-full mr-6"
                    />
                    <h1 className="text-sm text-secondary-200">
                      {member.memberId.name}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  };

  return (
    <div>
      <span className="flex justify-between items-center  mb-2  pr-5">
        <h1 className={`text-${h1Color}-700 font-medium text-sm`}>{title}</h1>
        <span
          className={`w-5 h-5 rounded-full flex justify-center items-center bg-${h1Color}-200 bg-opacity-50`}
        >
          <h1
            className={`text-${h1Color}-700 font-medium`}
            style={{ fontSize: ".6rem" }}
          >
            {todos?.length}
          </h1>
        </span>
      </span>
      <div className="tasks-container rounded-md to-do-tasks">
        {todos?.justAddedTodos?.length === 0 ? (
          <div className="flex items-center justify-center">
            <h1>No Todos.</h1>
          </div>
        ) : (
          todos?.map((todo, index) => (
            <div className="todo rounded-md" key={index}>
              <div className="header">
                <h1
                  className={`font-medium text-${h1Color}-600 cursor-pointer hover:text-${h1Color}-500 transition duration-100 pr-2`}
                  onClick={handleModalClicked}
                >
                  {todo?.heading.length > 35
                    ? `${todo?.heading.substring(0, 35)}...`
                    : todo?.heading}
                </h1>
                {modalTemplate(todo)}
                <span
                  className="m-0 h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-400 hover:bg-opacity-10  cursor-pointer"
                  onClick={(e) => {
                    history.push({ pathname: `/edit-todo/${todo._id}` });
                  }}
                >
                  <i class="fas fa-pen text-gray-500 text-xs"></i>
                </span>
              </div>
              <div className="middle">
                {todo?.tags?.length && (
                  <div className="tags mt-1 mb-2">
                    {todo?.tags?.slice(0, 3).map((tag, index) => (
                      <div
                        className={`tag tag-${index} rounded-full py-2 px-2`}
                        key={index}
                      >
                        <h1 className="font-semibold">
                          #
                          {tag.length > 12 ? `${tag.substring(0, 12)}...` : tag}
                        </h1>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {todo?.assignedMembers?.length !== 0 && (
                <div className="assignees mt-2">
                  <div class="member overflow-hidden pr-2">
                    <div className="left -space-x-1">
                      {todo?.assignedMembers?.length > 4 ? (
                        <div>
                          {todo?.assignedMembers
                            ?.slice(0, 4)
                            ?.map((member, index) => (
                              <img
                                class="rounded-full cursor-pointer"
                                src={member?.memberId?.profilePhoto}
                                alt=""
                                key={index}
                                data-tip
                                data-for="happyFace"
                              />
                            ))}
                          <span className="extra-member h-10 w-10 rounded-full bg-gray-200">
                            +{todo?.assignedMembers?.length - 4}
                          </span>
                        </div>
                      ) : (
                        todo?.assignedMembers?.map((member, index) => (
                          <img
                            class="rounded-full cursor-pointer"
                            src={member?.memberId?.profilePhoto}
                            alt=""
                            key={index}
                          />
                        ))
                      )}
                    </div>
                    <div className="right">
                      <img
                        class="rounded-full cursor-pointer"
                        src={todo?.creator?.profilePhoto}
                        alt=""
                        key={index}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="footer mt-2">
                <div className="left">
                  <i className="far fa-clock font-medium text-gray-400"></i>
                  <span className="font-medium text-gray-400 font-body ml-2">
                    {moment(todo?.deadline).format("MMM Do")}
                  </span>
                </div>
                <div className="right">
                  <span
                    className="m-0 h-6 w-6 flex justify-center items-center rounded-full hover:bg-gray-400 hover:bg-opacity-10  cursor-pointer"
                    onClick={(e) => {
                      handleDeleteTodo(e, todo._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
