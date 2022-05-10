import styled from "styled-components/macro";
import { bool, func, InferProps, string } from "prop-types";

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
`;

const Button = styled.input.attrs(() => ({
  type: "checkbox",
}))`
  appearance: none;
  margin: 0;
  padding: 0;
  position: relative;
  width: 4rem;
  height: 2rem;

  &:before {
    content: "";
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.4s;
    border-radius: 2rem;
    background-color: ${(props) => props.theme.contrast.medium};
  }

  &:after {
    content: "";
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    left: 0.25rem;
    bottom: 0.25rem;
    background-color: ${(props) => props.theme.primary};
    transition: 0.4s;
    border-radius: 50%;
  }

  &:checked {
    &:before {
      background-color: ${(props) => props.theme.contrast.high};
    }

    &:after {
      transform: translateX(2rem);
    }
  }
`;

export default function ToggleButton(
  props: InferProps<typeof ToggleButton.propTypes>
) {
  return (
    <Label>
      {props.label}
      <Button
        checked={props.checked}
        onChange={() => props.onChange && props.onChange()}
      />
    </Label>
  );
}

ToggleButton.propTypes = {
  label: string,
  checked: bool.isRequired,
  onChange: func,
};
