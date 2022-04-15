import { bool, func, InferProps } from "prop-types";
import styled from "styled-components";
import getFontSize from "../../utils/getFontSize";

const propTypes = {
  outlined: bool,
  onClick: func.isRequired,
};

const Button = styled.button.attrs(() => ({
  type: "button",
}))<InferProps<typeof propTypes>>`
  ${(props) =>
    props.outlined
      ? `
    background: transparent;
    border: 1px solid #fff;
    color: #fff;`
      : `
    background: #fff;
    border: none;
    color: #1f3756;`}

  border: none;
  width: 100%;
  font-size: ${(props) => getFontSize(props.children, 0.5)};
  font-family: inherit;
  padding: 14px;
  border-radius: 7px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
`;

Button.propTypes = propTypes;

export default Button;
