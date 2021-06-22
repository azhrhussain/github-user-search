import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "styled-bootstrap-grid";
import Button from "../../elements/Button";
import ErrorCard from "../../elements/ErrorCard";
import Input from "../../elements/Input";
import Loader from "../../elements/LoaderCard";
import { IRootState } from "../../utils/types";
import { USER_INPUT_ERROR, USER_SEARCH_INPUT_PLACEHOLDER } from "./constants";
import { getUser } from "./redux/actions";
import { IUserState } from "./types";
import UserCard from "./UserCard";

const Search = (): JSX.Element => {
  const dispatch = useDispatch();
  const user: IUserState = useSelector<IRootState>((state) => state.user);
  const [username, setUsername] = useState("");
  const [searchInputError, setSearchInputError] = useState("");

  //input value change
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
    setSearchInputError("");
  };

  const handleClickSearch = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (username) {
      setSearchInputError("");
      dispatch(getUser(username));
    } else {
      setSearchInputError(USER_INPUT_ERROR);
    }
  };
  return (
    <Container data-testid="search-user">
      <form onSubmit={handleClickSearch}>
        <Row>
          <Col lg={6}>
            <Input
              type="text"
              value={username}
              placeholder={USER_SEARCH_INPUT_PLACEHOLDER}
              onChange={handleChangeUsername}
              data-testid="search-input"
            />

            {searchInputError ? (
              <ErrorCard errorText={searchInputError} />
            ) : null}
          </Col>
          <Col lg={2}>
            <Button data-testid="search-btn" type="submit" primary>
              Search
            </Button>{" "}
            {username ? (
              <Button
                data-testid="clear-search-btn"
                onClick={() => {
                  setUsername("");
                }}
              >
                &times; Clear search
              </Button>
            ) : null}
          </Col>
        </Row>
      </form>
      <hr />
      <Row>
        <Col lg={4}>
          {user.isLoading ? (
            <Loader data-testid="loader" loaderText="Searching..." />
          ) : (
            <UserCard data-testid="user-card" {...user} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
