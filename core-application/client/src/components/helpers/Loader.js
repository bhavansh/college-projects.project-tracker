import React from "react";
import { MoonLoader } from "react-spinners";
import { css } from "@emotion/core";

const Loader = ({ isloading = true, color = "#fff", size = 15 }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div>
      <MoonLoader
        css={override}
        size={size}
        color={color}
        loading={isloading}
      />
    </div>
  );
};

export default Loader;
