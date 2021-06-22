import React from "react";
import { LOADING_DEFAULT_TEXTS } from "../../utils/constants";
import { ILoader } from "../../utils/types";

const Loader = (props: ILoader): JSX.Element => {
  const { loaderText } = props;
  return <h3>{loaderText || LOADING_DEFAULT_TEXTS}</h3>;
};
export default Loader;
