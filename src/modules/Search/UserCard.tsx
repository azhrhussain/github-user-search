import React from "react";
import { Link } from "react-router-dom";
import Card from "../../elements/Card";
import ErrorCard from "../../elements/ErrorCard";
import { IUserState } from "./types";
const UserCard = (props: IUserState): JSX.Element => {
  const { name, login, bio, avatar_url, error, isLoading } = props;
  return (
    <>
      {error && !isLoading ? <ErrorCard size="2" errorText={error} /> : null}

      {login ? (
        <>
          <h3>Your search result</h3>
          <Link to={`/user/${login}?page=1`}>
            <Card>
              <Card.Container>
                <Card.Header>
                  <Card.Thumbnail src={avatar_url} alt={login} />
                  <h3>{name || login}</h3>
                </Card.Header>
                <Card.Content>
                  <p>{bio}</p>
                </Card.Content>
              </Card.Container>
            </Card>
          </Link>
        </>
      ) : null}
    </>
  );
};
export default UserCard;
