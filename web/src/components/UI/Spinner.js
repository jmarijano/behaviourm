import React from "react";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const spinner = (props) => {
  return (
    <React.Fragment>
      <RingLoader loading={props.loading} css={override}></RingLoader>
    </React.Fragment>
  );
};

export default spinner;
