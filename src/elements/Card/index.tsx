import React from "react";
import styled from "styled-components";
import { Colors, spacing } from "../../utils/layout";

const CardBody = styled.div`
  margin: ${spacing(3)}px 0;
  height: 100%;
  text-decoration: none;
  color: ${Colors.textSecondary};
`;

const Header = styled.div`
  font-weight: 600;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing(2)}px;
`;
const Container = styled.div`
  border: 1px solid ${Colors.borderPrimary};
  background-color: white;
  border-radius: ${spacing(1)}px;
  text-align: center;
  cursor: pointer;
  padding: ${spacing(3)}px;
  height: calc(100% - 30px);
  margin: 15px 0;
`;

const Thumbnail = styled.img`
  width: ${spacing(35)}px;
  height: ${spacing(35)}px;
  border-radius: 50%;
`;
interface CardProps {
  children: any;
  onClick?: any;
}
const Card = ({ children, ...rest }: CardProps): JSX.Element => {
  return <CardBody {...rest}>{children}</CardBody>;
};
Card.Container = Container;
Card.Header = Header;
Card.Content = Content;
Card.Thumbnail = Thumbnail;

export default Card;
