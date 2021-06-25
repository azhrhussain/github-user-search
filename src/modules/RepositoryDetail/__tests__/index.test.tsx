import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ReactRouterDom, { BrowserRouter } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import RepositoryDetail from "../index";
import { LOADING_DEFAULT_TEXTS } from "../../../utils/constants";
import { FETCH_REPOSITORY_DETAIL, FETCH_REPOSITORY_README } from "../constants";
import {
  fetchRepositoryDetailApi,
  fetchRepositoryReadmeApi,
} from "../redux/services";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
afterEach(cleanup);
const useParams = {
  repositoryId: "country-phone-codes",
  userId: "azhrhussain",
};
let userRepositoryDetail = {
  isLoading: false,
  error: "",
  filePathTree: [] as string[],
  readme: "",
  readmeLoading: false,
  readmeError: "",
};
const history = {
  push: jest.fn(),
  goBack: jest.fn(),
};
const generateFilePathData = (count: number): string[] => {
  const records = [];
  for (let i = 1; i <= count; i += 1) {
    records.push(`file-${i}`);
  }
  return records;
};

const getProps = (count = 10) => {
  const userRepositoryDetail = {
    filePathTree: generateFilePathData(count),
  };

  return userRepositoryDetail;
};
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
  useHistory: jest.fn(() => history),
  useParams: () => useParams,
}));
const renderWithProvider = (component: {} | null | undefined) => {
  const store = mockStore({ userRepositoryDetail: getProps() });
  return (
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );
};
describe("Repository list component render", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("Renders RepositoryDetail successfully ", () => {
    const { getByTestId, getByText } = render(
      renderWithProvider(<RepositoryDetail />)
    );
    const searchBtn = getByTestId("search-btn");
    const repositoryDetailBtn = getByTestId("repository-detail-btn");
    const backBtn = getByTestId("back-btn");
    const repositoryDetail = getByText("Repository files");
    const readmeMd = getByText("README.md");

    expect(searchBtn).toBeInTheDocument();
    expect(repositoryDetailBtn).toBeInTheDocument();
    expect(backBtn).toBeInTheDocument();
    expect(repositoryDetail).toBeInTheDocument();
    expect(readmeMd).toBeInTheDocument();
  });
  //loader for files path and readmeMd

  it("Loading files path and readmeMd ", async () => {
    userRepositoryDetail = {
      ...userRepositoryDetail,
      isLoading: true,
      readmeLoading: true,
    };
    const store = mockStore({ userRepositoryDetail: userRepositoryDetail });

    const { queryAllByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <RepositoryDetail />
        </Provider>
      </BrowserRouter>
    );

    expect(queryAllByText(LOADING_DEFAULT_TEXTS)).toHaveLength(2);
  });

  //render repository files
  it("Display RepositoryDetail files and readmeMd text ", async () => {
    const dataCount = 15;
    userRepositoryDetail = {
      ...userRepositoryDetail,
      isLoading: false,
      readmeLoading: false,
      filePathTree: generateFilePathData(dataCount),
      readme: `# babel-plugin-styled-components-css-namespace Getting Started 1. Add the plugin with`,
    };
    const store = mockStore({ userRepositoryDetail: userRepositoryDetail });

    const { queryAllByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <RepositoryDetail />
        </Provider>
      </BrowserRouter>
    );

    const repositoryDetailContainer = queryAllByTestId("file-tree-container");
    const readmeMd = screen.getByText(
      "babel-plugin-styled-components-css-namespace Getting Started 1. Add the plugin with"
    );

    expect(repositoryDetailContainer).toHaveLength(dataCount);
    expect(readmeMd).toBeInTheDocument();
  });
  // error repository files and readmeMd
  it("Display RepositoryDetail files and readmeMd error ", async () => {
    userRepositoryDetail = {
      ...userRepositoryDetail,
      error: "File error occurred",
      readmeError: "readmeMd file error occurred",
    };
    const store = mockStore({ userRepositoryDetail: userRepositoryDetail });

    const { queryByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <RepositoryDetail />
        </Provider>
      </BrowserRouter>
    );

    expect(queryByText(userRepositoryDetail.error)).toBeInTheDocument();
    expect(queryByText(userRepositoryDetail.readmeError)).toBeInTheDocument();
  });

  // backBtn click
  it("Back button should work", () => {
    const { getByTestId, getByText } = render(
      renderWithProvider(<RepositoryDetail />)
    );
    const backBtn = getByTestId("back-btn");
    fireEvent.click(backBtn);
  });
  //breadcrumb link have proper title
  it("Repository list Link have correct title and RepositoryId exist", () => {
    const { getByText } = render(renderWithProvider(<RepositoryDetail />));
    const repositoryDetailBtn = getByText(useParams.userId);
    const repositoryDetail = getByText(
      `${useParams.repositoryId} Repository Detail`
    );

    expect(repositoryDetailBtn).toBeInTheDocument();
    expect(repositoryDetail).toBeInTheDocument();
  });
});
describe("test cases for APIs call", () => {
  const payload = {
    username: useParams.userId,
    repositoryName: useParams.repositoryId,
  };
  const mocFilesData = generateFilePathData(1);

  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
  });

  it("fetchRepositoryDetailApi should return data", async () => {
    let url = FETCH_REPOSITORY_DETAIL;
    url = url.replace("[username]", payload.username || "");
    url = url.replace("[repo]", payload.repositoryName || "");

    fetchMock.mockResponseOnce(JSON.stringify(mocFilesData));
    const response = await fetchRepositoryDetailApi(payload);
    const data = await response.json();
    expect(fetchMock.mock.calls[0][0]).toEqual(url);
    expect(data).toEqual(mocFilesData);
  });

  it("fetchRepositoryReadmeApi should return data", async () => {
    const mockReadmeResponseData =
      "# babel-plugin-styled-components-css-namespace Getting Started 1. Add the plugin with";
    let url = FETCH_REPOSITORY_README;
    url = url.replace("[username]", payload.username || "");
    url = url.replace("[repo]", payload.repositoryName || "");

    fetchMock.mockResponseOnce(JSON.stringify(mockReadmeResponseData));
    const response = await fetchRepositoryReadmeApi(payload);
    const data = await response.json();
    expect(fetchMock.mock.calls[0][0]).toEqual(url);
    expect(data).toEqual(mockReadmeResponseData);
  });
});
