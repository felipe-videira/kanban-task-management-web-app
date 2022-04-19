import { bool, func, InferProps } from "prop-types";
import styled from "styled-components/macro";

const propTypes = {
  outlined: bool,
  small: bool,
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

  ${(props) =>
    props.small
      ? `
    font-size: 1rem;
    padding: 10px;
    max-width: 150px;`
      : `
    font-size: 1.5rem;
    padding: 14px;
    max-width: 350px;`}
   
  width: 100%;
  font-family: inherit;
  border-radius: 7px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
`;

Button.propTypes = propTypes;

export default Button;
