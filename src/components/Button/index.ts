import { bool, func, InferProps } from "prop-types";
import styled from "styled-components/macro";

const propTypes = {
  outlined: bool,
  small: bool,
  icon: bool,
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
  transition: transform 300ms ease;

  &:hover {
    ${(props) => (props.icon ? "" : "transform: scale(1.05);")}
  }

  ${(props) =>
    props.icon
      ? `
    border: none;
    background: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 2rem;
    color: hsl(217, 16%, 45%);
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0;
    line-height: 0;
    padding: 0;

    svg {
      fill: hsl(217,16%,45%);
      height: inherit;
      width: inherit;
    }
    
    `
      : ""}
`;

Button.propTypes = propTypes;

export default Button;
