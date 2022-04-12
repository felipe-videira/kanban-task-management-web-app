import styled, { css } from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";
import {
  fadeIn,
  stepFadeIn,
  growAndfadeIn,
  radialBackgroundEffect,
} from "./keyframes";

//TODO: separar
export const Container = styled.div`
  animation: ${fadeIn} 2s linear 0s 1;
  animation-fill-mode: both;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  height: 100vh;
  padding: 0 5%;

  ${mobile} {
    padding: 0;
  }
}
`;

export const Display = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 3px solid #ffffff59;
  border-radius: 20px;
  padding: 2.5% 5%;

  ${mobile} {
    width: 75%;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
  width: 10%;
`;

interface ScoreProps {
  readonly value: number;
}

export const Score = styled.div<ScoreProps>`
  &::after {
    content: "${(props) => props.value}";
  }
`;

interface OptionsProps {
  readonly size: number;
}

export const Options = styled.div<OptionsProps>`
  ${(props) => `
    height: ${props.size}px;
    width: ${props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;
`}
`;

interface StepperProps {
  readonly value: number;
}

export const Step = styled.div<StepperProps>`
  animation: ${stepFadeIn} 1s linear 0s 1;
  animation-fill-mode: both;
  display: none;
`;

export const Stepper = styled.div<StepperProps>`
  ${(props) => `
    ${Step}[value="${props.value}"] {
      display: block;
    }
`}
`;

const GameResultChoice = css`
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;
`;

const GameResulChoicetWinner = css`
  position: relative;

  &::after {
    content: "";
    width: 300%;
    height: 300%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.2) 37.5%,
      rgba(255, 255, 255, 0.15) 38%,
      rgba(255, 255, 255, 0.1) 55%,
      rgba(255, 255, 255, 0.05) 56%,
      rgba(255, 255, 255, 0.025) 75%,
      rgba(255, 255, 255, 0) 76%
    );
    position: absolute;
    border-radius: 50%;
    top: -100%;
    left: -100%;
    z-index: -1;
    animation: ${radialBackgroundEffect} 2s linear 3s infinite alternate;
    animation-fill-mode: both;
  }
`;

export const GameResultUserChoice = styled.div`
  ${GameResultChoice}
`;

export const GameResultHouseChoice = styled.div`
  ${GameResultChoice}
  animation-name: ${fadeIn};
  animation-fill-mode: both;
`;

export const GameResult = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100px;
  height: 100px;
  animation-name: ${growAndfadeIn};
  animation-fill-mode: both;
  z-index: 1;
`;

interface GameResultProps {
  readonly userWins: boolean;
  readonly delayInSecs: number;
}

export const GameResultContainer = styled.div<GameResultProps>`
  display: flex;

  ${GameResultHouseChoice} {
    animation-duration: ${(props) => props.delayInSecs / 2}s;
    animation-delay: ${(props) => props.delayInSecs / 4}s;
  }

  ${GameResult} {
    animation-delay: ${(props) => props.delayInSecs / 2}s;
    animation-duration: ${(props) => props.delayInSecs / 4}s;
  }

  ${(props) =>
    props.userWins ? GameResultUserChoice : GameResultHouseChoice} {
    ${GameResulChoicetWinner}
  }
`;
