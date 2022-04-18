import { InferProps, number } from "prop-types";
import styled, { keyframes } from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";

const proptypes = {
  value: number,
};

const stepFadeIn = keyframes`
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

const Step = styled.div<InferProps<typeof proptypes>>`
  animation: ${stepFadeIn} 1s linear 0s 1;
  animation-fill-mode: both;
  display: none;
  width: 100%;

  ${mobile} {
    height: 100%;
  }
`;

const Stepper = styled.div<InferProps<typeof proptypes>>`
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

Step.propTypes = proptypes;
Stepper.propTypes = proptypes;

export { Step, Stepper };
export default Stepper;
