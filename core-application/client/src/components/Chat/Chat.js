import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { HashLoader } from "react-spinners";
import DashNavbar from "./../Dashboard/DashNavbar";
import UserInfo from "./UserInfo";
import ProjectInfo from "./ProjectInfo";
import ChatInfo from "./ChatInfo";

const Chat = ({ selectedProject, members }) => {
  const [userSelected, setUserSelected] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (members !== null) {
      setLoading(false);
      setUserSelected(members[0]?.memberId);
    }
  }, [members]);

  return (
    <div id="chat" className="">
      <DashNavbar />
      {!selectedProject ? (
        <div
          className="flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          None Project selected.
        </div>
      ) : loading ? (
        <div
          className="flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          <HashLoader size={50} color={"#ff6f3c"} />
        </div>
      ) : (
        <div className="chat-feature bg-white shadow-2xl rounded-2xl">
          <UserInfo
            members={members}
            userSelected={userSelected}
            setUserSelected={setUserSelected}
          />
          <ChatInfo />
          <ProjectInfo selectedProject={selectedProject} />
        </div>
      )}
    </div>
  );
};

Chat.propTypes = {
  selectedProject: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  selectedProject: state.data.selectedProject,
  members: state.data.members,
  credentials: state.user.credentials,
});

export default connect(mapStatesToProps, null)(Chat);
