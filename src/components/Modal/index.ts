import { bool, InferProps } from "prop-types";
import styled, { keyframes } from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";

const proptypes = {
  show: bool,
};

const modalFadeIn = keyframes`
  0% {
    display: none;
    width: 0;
    height: 0;
    opacity: 0;
  }
  25% {
    width: 100%;
    height: 100%;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    display: block;
    height: 100%;
    width: 100%;
  }
`;

const Modal = styled.div.attrs<InferProps<typeof proptypes>>((props) => ({
  key: props.show,
  style: {
    animationDirection: props.show ? "normal " : "reverse",
  },
}))<InferProps<typeof proptypes>>`
  animation-name: ${modalFadeIn};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
`;

Modal.propTypes = proptypes;

export default Modal;
