import  ReactRouterDom  from "react-router-dom";
import { useHandleClickNext, useHandleClickPrevious } from "../hooks";

const history = {
  push: jest.fn(),
  goBack: jest.fn(),
};
jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
  useHistory: jest.fn(() => history),
  useLocation: jest
    .fn()
    .mockReturnValue({ pathname: "/user/ali", search: "?page" }),
}));
describe("test cases for Pagination", () => {
  it("next page hook", () => {
    const page = 2;
    const handleClickNext = useHandleClickNext(page, 8);
    handleClickNext();
    expect(history.push).toBeCalledWith({ search: `?page=${page + 1}` });
  });
  it("next page if greater then total ", () => {
    const page = 4;
    const handleClickNext = useHandleClickNext(page, 4);
    handleClickNext();
  });
  it("Previous page hook", () => {
    const page = 3;
    const handleClickNext = useHandleClickPrevious(page);
    handleClickNext();
    expect(history.push).toBeCalledWith({ search: `?page=${page - 1}` });
  });
  it("Previous page if less then 1", () => {
    const page = 1;
    const handleClickNext = useHandleClickPrevious(page);
    handleClickNext();
  });
  
});