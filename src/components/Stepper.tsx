import { InferProps, number } from "prop-types";
import styled, { keyframes } from "styled-components/macro";

const proptypes = {
  value: number.isRequired,
};

const stepFadeIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  1% {
    transform: scale(1);
  }
  100% {
    opacity: 1;
  }
`;

const Step = styled.div<InferProps<typeof proptypes>>`
  animation: ${stepFadeIn} 1s linear 0s 1;
  animation-fill-mode: both;
  display: none;
  width: 100%;
  height: 100%;
`;

const Stepper = styled.div<InferProps<typeof proptypes>>`
  ${(props) => `
    ${Step}[value="${props.value}"] {
      display: block;
    }
`}
`;

Step.propTypes = proptypes;
Stepper.propTypes = proptypes;

export { Step, Stepper };
export default Stepper;
