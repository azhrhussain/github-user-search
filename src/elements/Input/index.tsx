import styled from "styled-components";
import { Colors, spacing } from "../../utils/layout";
const Input = styled.input`
  padding: ${spacing()}px;
  border: 1px solid ${Colors.borderPrimary};
  width: 100%;
  border-radius: ${spacing(1)}px;
`;

export default Input;
