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
    border: 2px solid ${props.theme.contrast.medium};
    color: ${props.theme.primary};`
      : `
    background: ${props.theme.primary};
    border: none;
    color: ${props.theme.secondary};`}

  ${(props) =>
    props.small
      ? `
      padding: 10px;
      max-width: 150px;`
      : `
      padding: 14px;
      max-width: 350px;`}
      
  font-size: 1rem;
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
    color: ${props.theme.contrast.low};
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0;
    line-height: 0;
    padding: 0;

    svg {
      fill: ${props.theme.contrast.low};
      height: inherit;
      width: inherit;
    }
    
    `
      : ""}
`;

Button.propTypes = propTypes;

export default Button;
