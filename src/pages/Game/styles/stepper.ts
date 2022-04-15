import styled, { keyframes } from "styled-components/macro";

type StepperProps = {
  readonly value: number;
};

export const stepFadeIn = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  50% {
    display: block;
  }
  100% {
    opacity: 1;
  }
`;

export const Step = styled.div<StepperProps>`
  animation: ${stepFadeIn} 1s linear 0s 1;
  animation-fill-mode: both;
  display: none;
  width: 100%;
`;

export const Stepper = styled.div<StepperProps>`
  ${(props) => `
    height: 65%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${Step}[value="${props.value}"] {
      display: block;
    }
`}
`;
