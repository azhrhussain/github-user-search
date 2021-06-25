import React from "react";
import { Link } from "react-router-dom";
import { Col } from "styled-bootstrap-grid";
import Card from "../../elements/Card";
import { IRepositoryList } from "./types";

const RepositoryCard = (props: IRepositoryList): JSX.Element => {
  const { id, name, description, login } = props;
  return (
    <Col key={id} alignSelf="stretch" md={6} lg={4}>
      <Link to={`/user/${login}/repos/${name}`}>
        <Card>
          <Card.Container>
            <Card.Header>
              <h3>{name} </h3>
            </Card.Header>
            <Card.Content>
              <p>{description}</p>
            </Card.Content>
          </Card.Container>
        </Card>
      </Link>
    </Col>
  );
};
export default RepositoryCard;
