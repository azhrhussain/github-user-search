import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Container, Row, Col } from "styled-bootstrap-grid";
import { IRootState } from "../../utils/types";
import { fetchRepositoryDetail, fetchRepositoryReadme } from "./redux/actions";
import Button from "../../elements/Button";
import { IRepositoryDetail, IUserRepositoryDetailState } from "./types";
import Loader from "../../elements/LoaderCard";
import ErrorCard from "../../elements/ErrorCard";

const RepositoryDetail = (): JSX.Element => {
  const { repositoryId, userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const userRepositoryDetail: IUserRepositoryDetailState =
    useSelector<IRootState>((state) => state.userRepositoryDetail);
  const { isLoading, filePathTree, error, readmeLoading, readmeError, readme } =
    userRepositoryDetail;
  const payload: IRepositoryDetail = {
    username: userId,
    repositoryName: repositoryId,
  };
  useEffect(() => {
    dispatch(fetchRepositoryDetail(payload));
  }, []);
  useEffect(() => {
    dispatch(fetchRepositoryReadme(payload));
  }, []);
  return (
    <Container>
      <Row>
        <Col lg={10}>
          <Link to="/" data-testid="search-btn">
            Search Repository
          </Link>{" "}
          /{" "}
          <Link
            to={`/user/${userId}?page=1`}
            data-testid="repository-detail-btn"
          >
            {userId}{" "}
          </Link>{" "}
          / <span>{repositoryId} Repository Detail</span>
        </Col>
        <Col lg={2}>
          <Button
            onClick={() => {
              history.goBack();
            }}
            data-testid="back-btn"
          >
            Back
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col lg={12}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!error && <h4>Repository files</h4>}
              {filePathTree.map((tree) => (
                <div key={tree} data-testid="file-tree-container">
                  <hr />
                  {tree}
                </div>
              ))}
            </>
          )}
          {!isLoading && error ? (
            <ErrorCard size="2" errorText={error} />
          ) : null}
        </Col>
      </Row>
      {/* ReadMe file */}
      <hr />
      <Row>
        <Col lg={12}>
          <h1>README.md</h1>
          <hr />
          {readmeLoading ? <Loader /> : <ReactMarkdown>{readme}</ReactMarkdown>}
          {!readmeLoading && readmeError ? (
            <ErrorCard size="2" errorText={readmeError} />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default RepositoryDetail;
