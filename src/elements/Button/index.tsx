import styled, { css } from "styled-components";
import { Colors, spacing } from "../../utils/layout";

interface IButtonStyle {
  primary?: boolean;
  disabled?: boolean;
}

const Button = styled("button")<IButtonStyle>`
  padding: ${spacing()}px;
  border: 1px solid
    ${(props) =>
      props.primary ? Colors.borderPrimary : Colors.bodrerSecondary};
  background-color: ${(props) =>
    props.primary ? Colors.primary : Colors.secondary};
  color: ${(props) =>
    props.primary ? Colors.textPrimary : Colors.textSecondary};
  border-radius: ${spacing(1)}px;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

export default Button;
