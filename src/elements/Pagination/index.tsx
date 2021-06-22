import React from "react";
import { IPagination } from "../../utils/types";
import Button from "../Button";

const Pagination = (props: IPagination): JSX.Element => {
  const { page, numPages, handleClickNext, handleClickPrevious } = props;
  return (
    <>
      <Button
        data-testid="previous-btn"
        disabled={page < 2}
        onClick={handleClickPrevious}
      >
        Previous
      </Button>{" "}
      <Button
        data-testid="next-btn"
        disabled={page >= numPages}
        onClick={handleClickNext}
      >
        Next
      </Button>{" "}
      <span>
        {page} of {numPages}
      </span>
    </>
  );
};
export default Pagination;
