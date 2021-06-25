import styled from "styled-components";
import { Colors } from "../../utils/layout";
interface IError {
  errorSize?: string;
}

const Error = styled("p")<IError>`
  color: ${Colors.danger};
  font-size: ${(props) => (props.errorSize == "2" ? "32px" : "16px")};
`;

export default Error;
