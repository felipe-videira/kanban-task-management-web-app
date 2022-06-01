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
  position: absolute;
  border-radius: 8px;
  padding: 2% 2% 3%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem 0;

  ${laptopOrFontSizeLarge} {
    width: 100%;
    height: 100%;
    overflow: auto;
    justify-content: center;
  }
`;

export const ModalTitle = styled.div`
  font-size: 2.25rem;
  text-transform: uppercase;
  font-weight: bold;
  flex: 1;

  ${laptopOrFontSizeLarge} {
    font-size: 2rem;
    width: 100%;
    text-align: center;
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
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const ModalContent = styled.div`
  width: 90%;
  margin: 0 5%;
`;
