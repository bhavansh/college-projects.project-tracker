import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signin, signup } from "./../../redux/actions/userActions";
import { GoogleLogin } from "react-google-login";
import avatarImg from "../../images/signinAvatar.jpg";
import googleImg from "../../images/google.svg";
import { setAlert } from "../../redux/actions/alertAction";
import { withRouter } from "react-router-dom";

const SignIn = ({ signin, setAlert, history }) => {
  const [isSignIn, setSignIn] = useState(true);
  const responseGoogle = (response) => {
    const { profileObj: googleInfo } = response;
    if (response.error) {
      setAlert(response.error, "error");
    } else if (isSignIn) {
      signin({ email: googleInfo.email }, history);
    } else {
      history.push({
        pathname: "/personal-info",
        state: { googleInfo },
      });
    }
  };

  const handleClickOnSignUp = (e) => setSignIn((prev) => !prev);

  return (
    <div id="sign-in" className="bg-bg-50 h-screen">
      <div className="container-section mx-auto mt-10">
        <div className="header">
          <h2 className="font-bold text-6xl text-center text-secondary-300">
            Welcome to the Project Tracker
          </h2>
        </div>
        <div className="middle flex justify-center my-10 ">
          <div className="flex flex-col items-center justify-center sign-in-card">
            <div className="top flex flex-col items-center justify-center my-5">
              <img
                src={avatarImg}
                alt="avatar"
                className="object-cover rounded-full h-24 w-24 flex items-center justify-center ring-4 ring-yellow-500 ring-opacity-50 my-5"
              />
              <h3 className="text-2xl font-semibold   divide-y-2 divide-secondary-100 divide-opacity-25">
                Sign {isSignIn ? "In" : "Up"} into System
              </h3>
            </div>
            <div className="bottom mt-5">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_CLIENT_ID}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="bg-primary-100 rounded-full py-2 px-6 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:ring-opacity-50"
                  >
                    <img
                      src={googleImg}
                      alt="googleImg"
                      className="inline h-5 mr-1"
                    />
                    <span> Sign {isSignIn ? "In" : "Up"} with google</span>
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <h6 className="text-sm mt-3">
                {isSignIn
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  className="text-primary-200 cursor-pointer underline ml-1 select-none"
                  onClick={handleClickOnSignUp}
                >
                  Sign {isSignIn ? "Up" : "In"}
                </span>
              </h6>
            </div>
          </div>
        </div>
        <div className="last1"></div>
        <div className="last2"></div>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  signin: PropTypes.func,
};

export default withRouter(connect(null, { signin, setAlert })(SignIn));
