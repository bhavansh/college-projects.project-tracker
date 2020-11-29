import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const ChatMessage = ({ chatData, credentials }) => {
  const isSendByLoggedInUser =
    chatData.senderId === credentials._id
      ? "sent text-white font-light"
      : "received";

  const getDocView = (chatData) => {
    return (
      <div className="doc-wrapper">
        <img src={chatData.profilePhoto} alt="" className="rounded-full mx-3" />
        <div className="flex flex-col items-start doc-column">
          <div className="doc-view bg-gray-100 shadow-lg rounded-md flex justify-between items-center py-2 px-4">
            <div className="file-type">
              <i className="far fa-file-alt text-xl  text-primary-200"></i>
              <h1 className=" text-secondary-100">
                {
                  chatData.fileName.split(".")[
                    chatData.fileName.split(".").length - 1
                  ]
                }
              </h1>
            </div>
            <h1 className="file-name text-secondary-400 font-medium">
              {chatData.fileName.length > 15
                ? `${chatData.fileName.substring(0, 15)}...`
                : chatData.fileName}
            </h1>
            <div className="m-0 h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-400 hover:bg-opacity-10  cursor-pointer">
              <a
                href={chatData.fileUrl}
                target="_blank"
                download={`${chatData.fileName}`}
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-primary-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="h-6 w-6 text-primary-200"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </a>
            </div>
          </div>
          <h5 className=" text-gray-500 day-ago">
            {moment(chatData.createdAt).fromNow()}
          </h5>
        </div>
      </div>
    );
  };

  return (
    <div className="message my-8">
      <div className={`${isSendByLoggedInUser}`}>
        {!chatData.isFile ? (
          <>
            <img
              src={chatData.profilePhoto}
              alt=""
              className="rounded-full mx-3"
            />
            <div className="message-text-container">
              <div className="message-text rounded-lg shadow-md">
                <h1 className="text-sm">{chatData?.text}</h1>
              </div>
              <h5 className="text-gray-500 day-ago">
                {moment(chatData.createdAt).fromNow()}
              </h5>
            </div>
          </>
        ) : chatData.fileType === "image" ? (
          <div className="image-chat flex items-start">
            <img
              src={chatData.profilePhoto}
              alt=""
              className="profile-img rounded-full mx-3"
            />
            <div className="img-content flex flex-col justify-center">
              <a
                href={chatData.fileUrl}
                className="cursor-pointer "
                target="_blank"
                download
              >
                <div className="img-view img-view-wrapper border-2 border-gray-200 border-opacity-40 bg-transparent shadow-xl">
                  <img src={chatData.fileUrl} alt="" className="" />
                </div>
              </a>
              <h5 className="text-gray-500 day-ago">
                {moment(chatData.createdAt).fromNow()}
              </h5>
            </div>
          </div>
        ) : (
          <div className="doc-view-wrapper">{getDocView(chatData)}</div>
        )}
      </div>
    </div>
  );
};

ChatMessage.propTypes = {};

const mapStatesToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStatesToProps, {})(ChatMessage);
