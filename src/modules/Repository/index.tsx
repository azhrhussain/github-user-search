import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "styled-bootstrap-grid";
import { IRootState } from "../../utils/types";
import { fetchRepositoryList } from "./redux/actions";
import Button from "../../elements/Button";
import { IRepositoryListPayload, IRepositoryListState } from "./types";
import RepositoryCard from "./RepositoryCard";
import Loader from "../../elements/LoaderCard";
import ErrorCard from "../../elements/ErrorCard";
import Pagination from "../../elements/Pagination";
import { useHandleClickNext, useHandleClickPrevious } from "./hooks";

const Repository = (): JSX.Element => {
  const dispatch = useDispatch();

  const userRepositories = useSelector<IRootState>(
    (state) => state.repos
  ) as IRepositoryListState;
  const { isLoading, error, reposData, numPages } = userRepositories;
  const { userId } = useParams<{ userId: string }>();

  const history = useHistory();
  const location = useLocation();
  const pageNumber: string | null = new URLSearchParams(location.search).get(
    "page"
  );

  useEffect(() => {
    if (!pageNumber) {
      history.push("/NotFound");
    } else {
      const payload: IRepositoryListPayload = {
        userId: userId,
        pageNumber: pageNumber.toString(),
      };
      dispatch(fetchRepositoryList(payload));
    }
  }, [userId, pageNumber]);

  const page: number = Number(pageNumber);

  const handleClickNext = useHandleClickNext(page, numPages!);
  const handleClickPrevious = useHandleClickPrevious(page);

  const hasPagination = reposData!.length > 1 && numPages;
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <Link to="/" data-testid="search-btn">
            Search user
          </Link>{" "}
          / Repositories
        </Col>
        <Col lg={2}>
          <Button data-testid="back-btn" onClick={() => history.goBack()}>
            Back
          </Button>
        </Col>
      </Row>
      <hr />

      <Row data-testid="repositories-list-container">
        {isLoading ? (
          <Loader data-testid="loader" />
        ) : (
          reposData!.map((repo) => {
            return (
              <RepositoryCard
                data-testid="repository-list-card"
                key={repo.id}
                {...repo}
              />
            );
          })
        )}
        {!isLoading && error ? (
          <ErrorCard
            data-testid="repository-list-error"
            size="2"
            errorText={error}
          />
        ) : null}
      </Row>

      {hasPagination ? (
        <>
          <hr />
          <Pagination
            data-testid="pagination"
            numPages={numPages}
            page={page}
            handleClickPrevious={handleClickPrevious}
            handleClickNext={handleClickNext}
          />
        </>
      ) : null}
    </Container>
  );
};

export default Repository;
