import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ReactRouterDom, { BrowserRouter } from "react-router-dom";
import Repository from "../index";
import { LOADING_DEFAULT_TEXTS } from "../../../utils/constants";
import queryString from "query-string";
//api
import { fetchRepositoryListApi } from "../redux/services";
import fetchMock from "jest-fetch-mock";
import { FETCH_USER_REPOSITORY } from "../constants";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
afterEach(cleanup);
let repos = {
  isLoading: false,
  error: "",
  numPages: 0,
  reposData: [] as {
    id: number;
    name: string;
    login: string;
    description: string;
  }[],
};
let store = mockStore({
  repos: repos,
});
const pageUrl = "/user/ali";
let queryParams = {
  page: 3,
};
const mockGetReposList = jest.fn();
const history = {
  push: jest.fn(),
  goBack: jest.fn(),
  location: { pathname: pageUrl, search: "" },
};
const generateData = (count: number) => {
  const records = [];

  for (let i = 1; i <= count; i += 1) {
    records.push({
      id: i,
      name: `azhr-${i}`,
      login: "Azhar Hussain",
      description: "disc",
    });
  }

  return records;
};

const getProps = (count = 10) => {
  const repos = {
    fetchRepositoryList: mockGetReposList,
    reposData: generateData(count),
    numPages: count || 0,
    page: 5, // to test prev
    isLoading: false,
    error: "",
  };

  return repos;
};

const renderWithProvider = (component: {} | null | undefined) => {
  const store = mockStore({ repos: getProps() });
  return (
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );
};

let location = { pathname: "/user/ali", search: "" };
jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
  useHistory: jest.fn(() => history),
  useLocation: jest.fn().mockImplementation(() => location),
}));
describe("test cases for fetchRepositoryListApi call", () => {
  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
  });

  const payload = {
    userId: "azhrhussain",
    pageNumber: queryParams.page.toString(),
  };
  const mocData = generateData(1);

  it("fetchRepositoryListApi should return data", async () => {
    let url = FETCH_USER_REPOSITORY;
    url = url.replace("[username]", encodeURI(payload.userId || ""));
    url = url.replace(
      "[pageNumber]",
      encodeURI(payload.pageNumber.toString() || "1")
    );
    expect(url).not.toContain("[pageNumber]");
    fetchMock.mockResponseOnce(JSON.stringify(mocData));
    const response = await fetchRepositoryListApi(payload);
    const data = await response.json();

    expect(fetchMock.mock.calls[0][0]).toEqual(url);
    expect(data).toEqual(mocData);
  });
  it("Renders Repository list successfully ", () => {
    const { getByTestId } = render(renderWithProvider(<Repository />));
    const searchBtn = getByTestId("search-btn");
    const backBtn = getByTestId("back-btn");
    const repositoryListCard = screen.queryByTestId("repository-list-card");
    expect(searchBtn).toBeInTheDocument();
    expect(backBtn).toBeInTheDocument();
    expect(repositoryListCard).not.toBeInTheDocument();
  });

  it("Show loader", async () => {
    repos = { ...repos, isLoading: true, reposData: [] };
    store = mockStore({ repos: repos });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Repository />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => screen.queryByTestId("loader"));
    expect(screen.getByText(LOADING_DEFAULT_TEXTS)).toBeInTheDocument();
  });
  it("Search and Back button should work", () => {
    const { getByTestId } = render(renderWithProvider(<Repository />));
    jest.spyOn(history, "push").mockReturnValue({ push: history });
    const searchBtn = getByTestId("search-btn");
    const backBtn = getByTestId("back-btn");
    fireEvent.click(searchBtn);
    fireEvent.click(backBtn);
  });
  it("Display repositories list", async () => {
    const dataCount = 15;
    repos = {
      ...repos,
      isLoading: false,
      reposData: generateData(dataCount),
    };
    store = mockStore({ repos: repos });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Repository />
        </Provider>
      </BrowserRouter>
    );
    const removeLoader = await waitFor(() => screen.queryByTestId("loader"));
    expect(removeLoader).not.toBeInTheDocument();
    // // find headings
    const cards = screen.getAllByRole("heading");
    expect(cards).toHaveLength(dataCount);
  });
  //error handling
  it("Show error", async () => {
    repos = {
      ...repos,
      error: "Unexpected Error",
    };
    store = mockStore({ repos: repos });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Repository />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(repos.error)).toBeInTheDocument();
  });

  it("test pagination with next page", () => {
    location = { pathname: "/user/ali", search: "?page=3" };
    jest.mock("react-router-dom", () => ({
      __esModule: true,
      ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
      useHistory: jest.fn(() => history),
      useLocation: jest.fn().mockReturnValue(location),
    }));
    render(renderWithProvider(<Repository />));
    const nextButton = screen.getByTestId("next-btn");
    expect(nextButton).toBeEnabled();
    jest.spyOn(history, "push").mockReturnValue({ push: history });
    fireEvent.click(nextButton);
    const paginationQueryParams = {
      ...queryParams,
      page: queryParams.page + 1,
    };
    let url = `?${queryString.stringify(paginationQueryParams)}`;
    expect(history.push).toHaveBeenCalledWith({ search: url });
  });
  it("test pagination previous button", async () => {
    render(renderWithProvider(<Repository />));
    const previousButton = screen.getByTestId("previous-btn");
    expect(previousButton).toBeEnabled();
    jest.spyOn(history, "push").mockReturnValue({ push: history });
    fireEvent.click(previousButton);
    expect(queryParams.page > 1).toBeTruthy();
    const paginationQueryParams = {
      ...queryParams,
      page: queryParams.page - 1,
    };
    const url = `?${queryString.stringify(paginationQueryParams)}`;
    expect(queryParams.page).toBeGreaterThan(1);
    expect(history.push).toHaveBeenCalledWith({ search: url });
  });
  it("test page not found", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Repository />
        </Provider>
      </BrowserRouter>
    );

    jest.spyOn(history, "push").mockReturnValue({ push: history });
    expect(history.push).toHaveBeenCalledWith("/NotFound");
  });
});
