import styled, { keyframes } from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";
import Button from "../Button";

type ModalOverlayProps = {
  readonly show: boolean;
};

const modalFadeIn = keyframes`
    0% {
        transform: scale(0);
        opacity: 0;
    }
    25% { transform: scale(1); }
    50% { opacity: 0; }
    100% { 
        opacity: 1; 
        transform: scale(1);
    }
`;

export const ModalOverlay = styled.div.attrs<ModalOverlayProps>((props) => ({
  key: props.show,
  style: {
    animationDirection: props.show ? "normal " : "reverse",
  },
}))<ModalOverlayProps>`
  animation-name: ${modalFadeIn};
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: ${(props) => props.theme.dark};
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
  padding: 2%;
  display: flex;
  flex-direction: column;

  ${mobile} {
    width: 100%;
    height: 100%;
    max-height: none;
    max-width: none;
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

export const ModalCloseButton = styled(Button).attrs(() => ({
  icon: true,
}))`
  ${mobile} {
    display: none;
  }
`;
