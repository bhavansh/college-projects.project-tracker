import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllToxitiesOfAUserFromARoom } from "../../redux/actions/dataActions";
import { HashLoader } from "react-spinners";
import moment from "moment";
import DashNavbar from "./../Dashboard/DashNavbar";

const ToxicChat = ({
  match: { params },
  getAllToxitiesOfAUserFromARoom,
  chatToxicity,
  history,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllToxitiesOfAUserFromARoom(params.userId, params.projectId);
    if (chatToxicity) {
      setLoading(false);
    }
  }, [chatToxicity?.count]);

  const toxicities = [
    "Identity Attack",
    "Insult",
    "Obscene",
    "Severe Toxicity",
    "Sexual Explicit",
    "Threat",
  ];
  return (
    <div>
      {loading ? (
        <div
          className=" flex justify-center items-center w-screen mx-auto "
          style={{ height: "80vh" }}
        >
          <HashLoader size={50} color={"#ff6f3c"} />
        </div>
      ) : (
        <>
          <DashNavbar history={history} />
          <div id="chat-toxicity" className="bg-bg-100">
            <div className="container-section">
              <div className="header flex justify-between items-center">
                <h1 className="text-xl font-semibold text-secondary-300">
                  All toxic chats
                </h1>
                <h1 className="text-xs h-6 w-6 p-1 flex justify-center items-center rounded-full font-medium bg-red-600 text-white">
                  {chatToxicity?.count}
                </h1>
              </div>
              <div className="chat-container my-3">
                {chatToxicity?.count === 0 ? (
                  <div
                    className="flex justify-center items-center w-full mx-auto "
                    style={{ height: "30vh" }}
                  >
                    No Toxic chats.
                  </div>
                ) : (
                  <div className="chat-wrapper">
                    {chatToxicity?.chatToxicities?.map((chat, index) => (
                      <div className="chat shadow-md rounded-md" key={index}>
                        <h1 className="text-base text-primary-300">
                          <i className="far fa-comment-alt mr-2"></i>
                          Chat
                        </h1>
                        <p className="text-gray-600 text-sm p-2">
                          {chat?.text}
                        </p>
                        <div className="toxicities items-start">
                          {chat?.probabilities?.map((proba, index) => (
                            <div
                              className="info-wrapper text-xs text-gray-400"
                              key={index}
                            >
                              {index !== chat?.probabilities?.length - 1 && (
                                <>
                                  <span className="text-green-500">
                                    <i className="fas fa-circle mr-2 text-xs"></i>
                                    {toxicities[index]}
                                  </span>
                                  <span className="ml-5">
                                    {(
                                      proba?.results?.probabilities[1] * 100
                                    ).toFixed(2)}
                                    %
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="toxicity-footer mt-3 mb-2 text-red-500 font-medium text-sm">
                          <div className="left">
                            <span>Overall Toxicity</span>
                            <span className="ml-3">
                              {chat?.probabilities[
                                chat?.probabilities?.length - 1
                              ]?.results?.probabilities[1]?.toFixed(2) * 100}
                              %
                            </span>
                          </div>
                          <div className="right">
                            <i className="fas fa-history text-green-500  text-xs mr-2"></i>
                            <h1 className="text-green-500 text-xs">
                              {moment(chat?.createdAt).format(
                                "DD, MMM, YY - HH:MM a"
                              )}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStatesToProps = (state) => ({
  chatToxicity: state.data.chatToxicity,
});
export default connect(mapStatesToProps, { getAllToxitiesOfAUserFromARoom })(
  ToxicChat
);
