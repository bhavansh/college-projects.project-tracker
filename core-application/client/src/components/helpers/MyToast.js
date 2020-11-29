import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import closeIcon from "../../images/close.svg";

const MyToast = ({ alert }) => {
  useEffect(() => {
    if (alert.type === "error") {
      toast(<Msg msg={alert.msg} type={alert.type} />);
    } else if (alert.type === "success") {
      toast(<Msg msg={alert.msg} type={alert.type} />);
    }
  }, [alert.type, alert.msg]);

  const Msg = ({ closeToast, msg, type }) => (
    <div
      className={`my-msg mx-auto flex items-center px-3 justify-between bg-white ${
        type === "error" ? "error" : "success"
      }`}
    >
      <h1 className={type === "error" ? "error" : "success"}>{msg}</h1>
      <img src={closeIcon} alt="" className="h-4 ml-2" onClick={closeToast} />
    </div>
  );
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      limit={2}
    />
  );
};

export default MyToast;
