import styled, { css, keyframes } from "styled-components/macro";
import { fadeIn } from "./keyframes";

const SHOW_HOUSE_CHOICE_DURATION_RATIO = 0.2;
const SHOW_HOUSE_CHOICE_DELAY_RATIO = 0.45;
const SHOW_RESULT_DURATION_RATIO = 0.55;
const SHOW_RESULT_DELAY_RATIO = 0.55;

type GameResultProps = {
  readonly userWins: boolean;
  readonly delayInSecs: number;
};

type GameResultChoiceProps = {
  readonly size: number;
  readonly label: string;
};

const growAndfadeIn = keyframes`
  0%  {
   	width: 0;
  	opacity: 0;
  }
  25% {
    width: 100%;
  }
  100% {
    width: 100%;
  	opacity: 1;
  }
`;

const radialBackgroundEffect = keyframes`
   0% {
      background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0) 38%);
      opacity: 0;
  }
  25% {
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.025) 56%,  rgba(255,255,255,0) 56%);
    opacity: 0.25;
  }
 50% {
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.05) 56%,  rgba(255,255,255,0) 56%);
    opacity: 0.5;
  }
   75% {
     background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.025) 56%, rgba(255,255,255,0.012.5) 75%, rgba(255,255,255,0.0) 76%);
     opacity: 0.75;
  }
  100% {
     background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 37.5%, rgba(255,255,255,0.15) 38%, rgba(255,255,255,0.1) 55%, rgba(255,255,255,0.05) 56%, rgba(255,255,255,0.025) 75%, rgba(255,255,255,0.0) 76%);
     opacity: 1;
  }
`;

const GameResulChoicetWinner = css<GameResultProps>`
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
    animation-name: ${radialBackgroundEffect};
    animation-duration: 1.25s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-delay: ${(props) => props.delayInSecs * 0.6}s;
    filter: opacity(0.5);
  }
`;

export const GameResultChoice = styled.div<GameResultChoiceProps>`
  ${(props) => `
    width: ${props.size}px;
    height: ${props.size}px;
    position: relative;
    background-color: rgb(0 0 0 / 25%);
    margin: 0 5%;
    flex-shrink: 0;

    &::before {
      content: '${props.label}';
      position: absolute;
      top: -88px;
      text-transform: uppercase;
      left: 0;
      text-align: center;
      width: 100%;
      font-size: 22px;
    }
  `}
  border-radius: 50%;
`;

export const GameResultUserChoice = styled(GameResultChoice)``;
export const GameResultHouseChoice = styled(GameResultChoice)`
  & > * {
    animation-name: ${fadeIn};
    animation-fill-mode: both;
    animation-duration: inherit;
    animation-delay: inherit;
  }
`;

export const GameResult = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  animation-name: ${growAndfadeIn};
  animation-fill-mode: both;
  z-index: 1;
  margin 0 5%;
`;

export const GameResultMessage = styled.p`
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 52px;
  font-weight: bold;
  margin: 10px 0;
`;

export const GameResultContainer = styled.div<GameResultProps>`
  display: flex;
  justify-content: space-evenly;

  ${GameResultHouseChoice} {
    animation-duration: ${(props) =>
      props.delayInSecs * SHOW_HOUSE_CHOICE_DURATION_RATIO}s;
    animation-delay: ${(props) =>
      props.delayInSecs * SHOW_HOUSE_CHOICE_DELAY_RATIO}s;
  }

  ${GameResult} {
    animation-duration: ${(props) =>
      props.delayInSecs * SHOW_RESULT_DURATION_RATIO}s;
    animation-delay: ${(props) => props.delayInSecs * SHOW_RESULT_DELAY_RATIO}s;
  }

  ${(props) =>
    props.userWins ? GameResultUserChoice : GameResultHouseChoice} {
    ${GameResulChoicetWinner}
  }
`;
