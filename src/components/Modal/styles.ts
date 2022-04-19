import styled, { keyframes } from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";

type ModalOverlayProps = {
  readonly show: boolean;
};

const modalFadeIn = keyframes`
    0% {
        display: none;
        width: 0;
        height: 0;
        opacity: 0;
    }
    25% { height: 100%; width: 100%; }
    50% { opacity: 0; }
    100% { 
        opacity: 1; 
        display: block; 
        height: 100%; 
        width: 100%; 
    }
`;

export const ModalOverlay = styled.div.attrs<ModalOverlayProps>((props) => ({
  key: props.show,
  style: {
    animationDirection: props.show ? "normal " : "reverse",
  },
}))<ModalOverlayProps>`
  animation-name: ${modalFadeIn};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: hsl(229, 25%, 31%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: #fff;
  width: 30%;
  height: 60%;
  max-width: 500px;
  max-height: 700px;
  position: absolute;
  border-radius: 8px;
  padding: 2% 2% 0;
  display: flex;
  flex-direction: column;

  ${mobile} {
    width: 100%;
    height: 100%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2.5rem;
  text-transform: uppercase;
  font-weight: bold;

  ${mobile} {
    font-size: 3rem;
    flex: 0.25;
    justify-content: center;
  }
`;

export const ModalCloseButton = styled.button`
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 3rem;
  color: #c2c2c2;

  ${mobile} {
    display: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;
