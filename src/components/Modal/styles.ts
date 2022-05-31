import styled, { keyframes } from "styled-components/macro";
import { laptopOrFontSizeLarge, mobileXs } from "../../utils/breakpoints";
import Button from "../Button";

type ModalOverlayProps = {
  readonly show: boolean;
  readonly animationDuration: number;
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
  animation-duration: ${(props) => props.animationDuration}s;
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
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  background: #fff;
  width: 25%;
  height: 55%;
  position: absolute;
  border-radius: 8px;
  padding: 2% 2% 1%;
  display: flex;
  flex-wrap: wrap;

  ${laptopOrFontSizeLarge} {
    width: 100%;
    height: 100%;
    overflow: auto;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  }
`;

export const ModalTitle = styled.div`
  font-size: 2.25rem;
  text-transform: uppercase;
  font-weight: bold;
  flex: 1;

  ${laptopOrFontSizeLarge} {
    font-size: 2rem;
    flex: 0.25;
    justify-content: center;
  }

  ${mobileXs} {
    font-size: 1rem;
  }
`;

export const ModalCloseButton = styled(Button).attrs(() => ({
  icon: true,
}))`
  height: 2.5rem;
  width: 2.5rem;

  svg {
    fill: rgba(0 0 0 / 0.2);
  }

  ${laptopOrFontSizeLarge} {
    order: 3;
  }
`;

export const ModalContent = styled.div`
  width: 90%;
  margin: 10% auto;
`;
