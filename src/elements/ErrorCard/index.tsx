import React from "react";
import { IErrorCard } from "../../utils/types";
import Error from "../Error/index ";

const ErrorCard = (props: IErrorCard): JSX.Element => {
  const { errorText, size } = props;
  return <Error errorSize={size}>{errorText}</Error>;
};
export default ErrorCard;
