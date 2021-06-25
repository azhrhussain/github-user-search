import "@testing-library/jest-dom/extend-expect";

import React from "react";
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
import { BrowserRouter } from "react-router-dom";
import Search from "../index";
import { USER_INPUT_ERROR } from "../constants";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let user = {
  login: "azhrhussain",
  avatar_url: "my-url",
  name: "Azhar Hussain",
  bio: "my bio",
  isLoading: false,
  error: "",
};
let store = mockStore({
  user: user,
});
afterEach(cleanup);
describe("Search component render", () => {
  it("Renders Search successfully ", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    const input = getByTestId("search-input");
    const searchBtn = getByTestId("search-btn");
    const clearSearchBtn = screen.queryByTestId("clear-search-btn");
    expect(input).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(clearSearchBtn).not.toBeInTheDocument();
  });

  it("Show error on Search button click if search input is empty", () => {
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const input = getByTestId("search-input");
    const searchBtn = getByTestId("search-btn");
    const clearSearchBtn = screen.queryByTestId("clear-search-btn");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(searchBtn);

    expect(clearSearchBtn).not.toBeInTheDocument();
    expect(getByText(USER_INPUT_ERROR)).toBeInTheDocument();
  });

  it("Show Clear Search button if search input is Not empty", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const input = getByTestId("search-input");
    fireEvent.change(input, { target: { value: user.login } });
    const clearSearchBtn = getByTestId("clear-search-btn");
    expect(clearSearchBtn).toBeInTheDocument();
  });
  it("Clear search input by clicking on Clear Search button and hide Clear Search button", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    const input = getByTestId("search-input");
    fireEvent.change(input, { target: { value: user.login } });
    const clearSearchBtn = getByTestId("clear-search-btn");
    expect(clearSearchBtn).toBeInTheDocument();
    fireEvent.click(clearSearchBtn);
    fireEvent.change(input, { target: { value: "" } });
    expect(clearSearchBtn).not.toBeInTheDocument();
  });

  it("Show UserCard on Search button click", async () => {
    user = { ...user, login: "" };
    store = mockStore({ user: user });
    const LOGIN = "azhrhussain";
    const NAME = "Azhr Hussain";
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    const input = screen.getByTestId("search-input");
    const searchBtn = screen.getByTestId("search-btn");
    fireEvent.change(input, { target: { value: LOGIN } });
    fireEvent.click(searchBtn);
    user = { ...user, isLoading: true };
    store = mockStore({ user: user });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    await waitFor(() => screen.queryByTestId("loader"));
    expect(screen.getByText("Searching...")).toBeInTheDocument();
    user = { ...user, isLoading: false, login: LOGIN, name: NAME };
    store = mockStore({ user: user });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    const removeLoader = await waitFor(() => screen.queryByTestId("loader"));
    expect(removeLoader).not.toBeInTheDocument();
    expect(screen.queryByText(NAME)).toBeInTheDocument();
  });

  it("Show error if error occurred", () => {
    user = { ...user, isLoading: false, error: "some error" };
    store = mockStore({ user: user });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    const error = screen.getByText(user.error);
    expect(error).toBeInTheDocument();
  });

  it("Show login if user name is empty", () => {
    user = { ...user, isLoading: false, login: "azhrhussain", name: "" };
    store = mockStore({ user: user });
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );
    const login = screen.getByText(user.login);
    expect(login).toBeInTheDocument();
  });
});
