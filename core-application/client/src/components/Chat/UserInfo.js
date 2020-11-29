import React from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ userSelected, members, setUserSelected }) => {
  return (
    <div className="user-info">
      <div className="top border-2 border-gray-200 rounded-xl">
        <img
          src={userSelected?.profilePhoto}
          alt=""
          className="rounded-full ring-4 ring-primary-300 ring-opacity-50"
        />
        <Link to={`/profile/${userSelected._id}`}>
          <h1 className="flex items-center text-secondary-300 font-medium text-lg mt-4 transition duration-200 ease-out hover:text-primary-200">
            {userSelected?.name}{" "}
            <i className="fas fa-external-link-alt text-xs ml-1"></i>
          </h1>
        </Link>
        <h1 className="text-gray-500 font-medium text-sm">
          @{userSelected?.username}
        </h1>
      </div>
      <h2 className="mb-5 text-secondary-400 font-semibold text-lg mt-4 flex items-center justify-between">
        <span>Project Members </span>
        <span className="bg-primary-100 bg-opacity-60 rounded-full h-5 w-5 flex items-center justify-center text-secondary-400 font-semibold text-xs ">
          {members?.length}
        </span>
      </h2>
      <div className="bottom">
        {members && members.length === 0 ? (
          <div
            className="flex justify-center items-center mx-auto text-sm text-secondary-200"
            style={{ height: "20vh" }}
          >
            No members
          </div>
        ) : (
          <div className="members">
            {members?.map(
              (member, index) =>
                member && (
                  <div
                    key={index}
                    className="member rounded-xl my-1 cursor-pointer"
                    onClick={() => {
                      setUserSelected(member.memberId);
                    }}
                  >
                    <img
                      src={member?.memberId?.profilePhoto}
                      alt=""
                      className="shadow-md h-7 w-7 rounded-full object-cover"
                    />
                    <h1 className="text-secondary-300 text-sm ml-4  ">
                      {member?.memberId?.name}
                    </h1>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
