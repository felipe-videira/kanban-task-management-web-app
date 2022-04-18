import styled, { keyframes, css } from "styled-components/macro";
import { mobile, phone, phoneSm, tablet } from "../../utils/breakpoints";
import getFontSize from "../../utils/getFontSize";

const SHOW_HOUSE_CHOICE_DURATION_RATIO = 0.2;
const SHOW_HOUSE_CHOICE_DELAY_RATIO = 0.45;
const SHOW_RESULT_DURATION_RATIO = 0.55;
const SHOW_RESULT_DELAY_RATIO = 0.55;

type ScoreProps = {
  readonly value: number;
  readonly label: string;
};

type OptionsProps = {
  readonly size: number;
};

type GameResultProps = {
  readonly userWins: boolean;
  readonly delayInSecs: number;
};

type GameResultChoiceProps = {
  readonly size: number;
  readonly label: string;
};

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }`;

const growAndfadeIn = keyframes`
  0%  {
   	width: 0;
  	opacity: 0;
    margin: 0;
  }
  25% {
    width: 100%;
    margin 0 5%;
  }
  100% {
    width: 100%;
    margin 0 5%;
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

export const Container = styled.div`
  animation: ${fadeIn} 2s linear 0s 1;
  animation-fill-mode: both;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  height: 100vh;
  padding: 0 2%;

  ${mobile} {
    padding: 0;
  }
}
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  border: 3px solid hsl(217, 16%, 45%);
  border-radius: 10px;
  padding: 15px;

  ${mobile} {
    width: 70%;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
  line-height: 0.8;
  padding-left: 10px;
  width: 10%;
  margin: 0;
  font-size: ${(props) => getFontSize(props.children, 3)};
`;

export const Score = styled.div.attrs<ScoreProps>((props) => ({
  key: props.value,
}))<ScoreProps>`
  background: #fff;
  width: 25%;
  max-width: 100px;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s linear 0s 1;
  animation-fill-mode: both;
  padding: 1% 2%;

  &::before {
    content: "${(props) => props.label}";
    font-size: 1rem;
    color: hsl(229, 64%, 46%);
    text-transform: uppercase;
    letter-spacing: 1.5px;

    ${phone} {
      font-size: 0.9rem;
    }

    ${phoneSm} {
      font-size: 0.7rem;
    }
  }

  &::after {
    content: "${(props) => props.value}";
    font-size: 3rem;
    color: hsl(229, 25%, 31%);
    margin: -5px;
    font-weight: bold;

    ${phone} {
      font-size: 2rem;
    }

    ${phoneSm} {
      font-size: 1.5rem;
    }
  }
`;

export const OptionsContainer = styled.div<OptionsProps>`
  ${(props) => `
    height: ${props.size}px;
    width: ${props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;
    margin: 0 auto;
`}
`;

export const RulesButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  ${mobile} {
    justify-content: center;
    height: 100px;
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
        top: -5rem;
        text-transform: uppercase;
        left: 0;
        text-align: center;
        width: 100%;
        font-size: 1.5rem;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        letter-spacing: 2px;

        ${mobile} {
          top: unset;
        }

        ${phoneSm} {
          font-size: 0.75rem;
          bottom: -3rem;
        }

        ${phone} {
          bottom: -3rem;
          font-size: 1rem;
        }

        ${tablet} {
          bottom: -5rem;
          font-size: 2rem;
        }
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

  ${mobile} {
    animation-name: ${fadeIn};
    width: 60%;
    margin 0 5%;
  	opacity: 0;
    order: 3;
  }
`;

export const GameResultMessage = styled.p`
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 3.5rem;
  font-weight: bold;
  margin: 10px 0;
`;

export const GameResultContainer = styled.div<GameResultProps>`
  display: flex;
  justify-content: space-evenly;

  ${mobile} {
    height: 100%;
    flex-wrap: wrap;
    align-items: center;
  }

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
