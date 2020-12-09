import React, { useState, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { storage, firestore } from "../../firebase/firebaseSetup";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import { connect } from "react-redux";
import { DotLoader, PropagateLoader } from "react-spinners";
import mime from "mime-types";
import { Picker, emojiIndex } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { postAToxicity } from "../../redux/actions/dataActions";
import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";
import { setAlert } from "./../../redux/actions/alertAction";

const ChatInfo = ({
  selectedProject,
  credentials,
  postAToxicity,
  setAlert,
}) => {
  const storageRef = storage.ref();
  const projectRef = firestore.collection("projects");
  const query = projectRef
    .doc(selectedProject._id)
    .collection("chats")
    .orderBy("createdAt", "asc")
    .limit(25);

  const [chats, loading, error] = useCollectionData(query, { idField: "id" });
  const [chatValue, setchatValue] = useState("");
  const [uploading, setuploading] = useState(false);

  const scrollRef = useRef();

  const checkAndStoreToxicity = (text) => {
    const threshold = 0.9;
    toxicity.load(threshold).then((model) => {
      model.classify([text]).then((predictions) => {
        // console.log(predictions);
        const chatToxicityData = {
          text: text,
          probabilities: predictions.map((pred) => ({
            label: pred.label,
            results: pred.results[0],
          })),
        };
        const matchesArray = predictions.filter(
          (pred) => pred.results[0].probabilities[1] > 0.7
        );
        // console.log(matchesArray.length);
        if (matchesArray.length > 0) {
          postAToxicity(chatToxicityData, selectedProject._id);
        }
      });
    });
  };

  const storeToDB = async (
    text,
    fileName,
    fileType,
    fileUrl,
    isFile,
    profanityIndex = 0,
    profanityRemark = null
  ) => {
    if (setEmojiPicker === true) {
      handleToggleEmojiPicker();
    }

    if (isBannedMember(credentials?._id)) {
      setAlert(
        "You were banned from project due to violating chat policies. Contact admin of project.",
        "error"
      );

      setchatValue("");
      setuploading(false);
      return;
    }

    await projectRef.doc(selectedProject._id).collection("chats").add({
      senderId: credentials?._id,
      profilePhoto: credentials?.profilePhoto,
      text: text,
      fileName,
      fileType,
      isFile,
      fileUrl,
      profanityIndex,
      profanityRemark,
      createdAt: new Date().toISOString(),
    });
    setchatValue("");
    setuploading(false);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

    // Check for profanities
    if (!isFile) {
      checkAndStoreToxicity(text);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const profanityIndex = 0;
    const profanityRemark = null;
    await storeToDB(
      chatValue,
      null,
      null,
      null,
      false,
      profanityIndex,
      profanityRemark
    );
  };

  const getFileType = (file) => {
    return file.type.split("/")[0];
  };

  const mediaInputRef = useRef();
  const uploadFile = async (file, metadata) => {
    const pathToUpload = selectedProject._id;
    const fileName = file.name;
    const ext = file.name.split(".")[file.name.split(".").length - 1];

    const filePath = `chats/projects/${pathToUpload}/${fileName.replace(
      `.${ext}`,
      ""
    )}-${uuidV4().substring(0, 5)}.${ext}`;
    setuploading(true);
    const uploadTask = await storageRef.child(filePath).put(file, metadata);
    const url = await uploadTask.ref.getDownloadURL();
    return url;
  };

  const handleOnFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = file.name;
    const fileType =
      getFileType(file) === "application" ? "docs" : getFileType(file);
    const metadata = { contentType: mime.lookup(fileName) };
    const fileUrl = await uploadFile(file, metadata);
    await storeToDB(null, fileName, fileType, fileUrl, true);
  };

  const [emojiPicker, setEmojiPicker] = useState(false);
  const handleToggleEmojiPicker = (e) => {
    setEmojiPicker((prev) => !prev);
  };

  const colonToUnicode = (msg) => {
    return msg.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
      x = x.replace(/:/g, "");
      let emoji = emojiIndex.emojis[x];
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native;
        if (typeof unicode !== "undefined") {
          return unicode;
        }
      }
      x = ":" + x + ":";
      return x;
    });
  };

  const handleSelectEmoji = (emoji) => {
    setchatValue((prev) => colonToUnicode(` ${prev} ${emoji.colons} `));
  };

  const isBannedMember = (userId) => {
    const isBanned = selectedProject?.bannedMembers?.find(
      (member) => member?.memberId === userId
    );
    if (isBanned !== undefined) return true;
    else return false;
  };

  return loading ? (
    <div className="chat-section flex justify-center items-center w-screen mx-auto ">
      <PropagateLoader size={10} color={"#ff6f3c"} />
    </div>
  ) : (
    <div className="chat-section rounded-xl">
      <div className="chat-wrapper">
        <div className="chats">
          {chats &&
            chats.map((chat) => <ChatMessage key={chat.id} chatData={chat} />)}
          <div ref={scrollRef}></div>
        </div>
      </div>
      <div className="emoji-relative">
        {emojiPicker && (
          <div className="emojiPicker">
            <Picker
              set="apple"
              title="Pick your emoji"
              emoji="point_up"
              onSelect={handleSelectEmoji}
            />
          </div>
        )}
        <div className="input-div px-3 py-3 rounded-xl" onSubmit={sendMessage}>
          <input
            ref={mediaInputRef}
            type="file"
            name="media"
            id="media"
            className="hidden"
            onChange={handleOnFileChange}
          />
          {uploading ? (
            <DotLoader size={30} color={"#1F2937"} />
          ) : (
            <div
              className="m-0 h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-400 hover:bg-opacity-10  cursor-pointer"
              onClick={(e) => {
                mediaInputRef.current.click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="h-5 w-5 text-gray-400"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </div>
          )}
          <div
            className="m-0 h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-400 hover:bg-opacity-10  cursor-pointer"
            onClick={handleToggleEmojiPicker}
          >
            <i className="emoji-icon far fa-smile text-xl text-gray-400"></i>
          </div>
          <input
            value={chatValue}
            onChange={(e) => setchatValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter")
                storeToDB(chatValue, null, null, null, false, 0, null);
            }}
            placeholder="Say something nice..."
            className="rounded-lg outline-none py-2 px-3 border-2 border-gray-200"
          />

          <button
            type="submit"
            onClick={sendMessage}
            disabled={!chatValue}
            className="rounded-full px-4 py-2 ml-2 text-sm bg-primary-100 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:ring-opacity-40"
          >
            Send <i className="far fa-paper-plane ml-1 text-sm"></i>
          </button>

          <div
            className="take-to-bottom-btn"
            onClick={(e) => {
              scrollRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span class="flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatesToProps = (state) => ({
  selectedProject: state.data.selectedProject,
  members: state.data.members,
  credentials: state.user.credentials,
});

export default connect(mapStatesToProps, { postAToxicity, setAlert })(ChatInfo);
