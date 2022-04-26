import { InferProps, number } from "prop-types";
import styled, { keyframes, css } from "styled-components/macro";
import Button from "../../components/Button";
import Stepper from "../../components/Stepper";
import { mobile, phone, phoneSm, tablet } from "../../utils/breakpoints";
import getFontSize from "../../utils/getFontSize";

const gameResultPropTypes = {
  showHouseChoiceDelay: number.isRequired,
  showHouseChoiceDuration: number.isRequired,
  showResultDelay: number.isRequired,
  showResultDuration: number.isRequired,
  winnerBackgroundEffectDelay: number.isRequired,
};

type ScoreContainerProps = {
  readonly label: string;
};

type ScoreValueProps = {
  readonly name: string;
};

type OptionsProps = {
  readonly size: number;
};

type GameResultProps = {
  readonly userWins: boolean;
} & InferProps<typeof gameResultPropTypes>;

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
  	opacity: 0;
    transform: scale(0);
  }
  1% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  	opacity: 1;
  }
`;

const moveLeft = keyframes`
  from  {
    transform: translateX(45%);
  }
  to {
    transform: translateX(0);
  }
`;

const moveRight = keyframes`
  from  {
    transform: translateX(-45%);
  }
  to {
    transform: translateX(0);
  }
`;

const radialBackgroundEffect = keyframes`
  0% {
    background: radial-gradient(circle, 
      rgba(255,255,255,0.2) 0%, 
      rgba(255,255,255,0.2) 37.5%, 
      rgba(255,255,255,0.15) 38%, 
      rgba(255,255,255,0) 38%);
    opacity: 0;
  }
  100% {
    background: radial-gradient(circle, 
      rgba(255,255,255,0.2) 0%, 
      rgba(255,255,255,0.2) 37.5%, 
      rgba(255,255,255,0.15) 38%, 
      rgba(255,255,255,0.1) 55%, 
      rgba(255,255,255,0.05) 56%, 
      rgba(255,255,255,0.025) 75%, 
      rgba(255,255,255,0.0) 76%);
    opacity: 0.4;
  }
`;

export const Container = styled.div`
  animation: ${fadeIn} 2s linear 0s 1;
  animation-fill-mode: both;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  height: 100vh;
  display: grid;
  grid-template:
    ". header header header ."
    ". game game game ."
    ". . . . rules";
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 60% 0.5fr;

  ${mobile} {
    display: flex;
    gap: 2.5%;
    padding: 5px;
  }
}
`;

export const GoBackButton = styled(Button).attrs(() => ({
  icon: true,
  small: true,
}))`
  align-self: start;
  margin: 5%;
  z-index: 2;
  transform: scale(0.75);
  display: none;

  ${mobile} {
    display: block;
  }
`;

export const RulesButton = styled(Button).attrs(() => ({
  outlined: true,
  small: true,
}))`
  align-self: center;
  grid-area: rules;
  justify-self: end;
  margin: 5%;
  border-radius: 8px;
  width: 130px;
  z-index: 2;

  ${mobile} {
    align-self: center;
    margin: 0 0 10% 0;
  }
`;

export const TitleContainer = styled.div`
  border: 3px solid ${(props) => props.theme.contrast.low};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  padding: 10px 15px;
  grid-area: header;
  width: 80%;
  margin: 0 auto;
  z-index: 2;

  ${mobile} {
    width: 60%;
  }

  ${phone} {
    border-radius: 7px;
    padding: 10px;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
  line-height: 0.8;
  text-shadow: 1px 1px 5px rgb(0 0 0 / 25%);
  width: 10%;
  font-weight: normal;
  font-size: ${(props) => getFontSize(props.children, 2)};
  margin: 0 0 0 25px;

  ${mobile} {
    margin-left: 15px;
  }
`;

export const ScoreValue = styled.div.attrs<ScoreValueProps>((props) => ({
  key: props.children,
}))<ScoreValueProps>`
  font-size: 3rem;
  color: ${(props) => props.theme.dark};
  margin: -5px;
  animation: ${fadeIn} 1s linear 0s 1;
  animation-fill-mode: both;
  font-weight: bold;

  &:first-child {
    order: 1;
  }

  &:last-child {
    order: 3;
  }

  ${tablet} {
    font-size: 3rem;
  }

  ${phone} {
    font-size: 1.5rem;
  }

  ${phoneSm} {
    font-size: 1.25rem;
  }
`;

export const ScoreContainer = styled.div<ScoreContainerProps>`
  background: ${(props) => props.theme.primary};
  width: 25%;
  max-width: 125px;
  border-radius: 7px;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4% 3%;
  gap: 0 15%;

  ${phone} {
    border-radius: 3px;
  }

  &::before {
    content: "${(props) => props.label}";
    font-size: 1.2rem;
    color: ${(props) => props.theme.contrast.high};
    text-transform: uppercase;
    letter-spacing: 1.5px;
    width: 100%;
    text-align: center;
    font-weight: bold;

    ${phone} {
      font-size: 0.7rem;
    }

    ${phoneSm} {
      font-size: 0.5rem;
    }
  }

  &::after {
    content: "x";
    order: 2;
    font-size: 2rem;
    color: ${(props) => props.theme.dark};
    font-weight: bold;

    ${phone} {
      font-size: 1.5rem;
    }

    ${phoneSm} {
      font-size: 1.25rem;
    }
  }
`;

export const GameStepper = styled(Stepper)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: game;
  height: 60%;
  z-index: 1;
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

const GameResulChoicetWinner = css<GameResultProps>`
  position: relative;

  &::after {
    content: "";
    width: 300%;
    height: 300%;
    position: absolute;
    border-radius: 50%;
    top: -100%;
    left: -100%;
    z-index: -1;
    animation-name: ${radialBackgroundEffect};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-timing-function: ease;
    animation-delay: ${(props) => props.winnerBackgroundEffectDelay}s;
  }
`;

export const GameResultChoice = styled.div<GameResultChoiceProps>`
  ${(props) => `
      width: ${props.size}px;
      height: ${props.size}px;
      position: relative;
      background-color: rgb(0 0 0 / 25%);
      margin: 5rem 5% 0;
      flex-shrink: 0;

      ${mobile} {
        margin: 0 5%;
      }

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

  animation-fill-mode: both;
  border-radius: 50%;
`;

export const GameResultUserChoice = styled(GameResultChoice)`
  animation-name: ${moveLeft};

  ${mobile} {
    animation-name: none;
  }
`;

export const GameResultHouseChoice = styled(GameResultChoice)`
  animation-name: ${moveRight};

  ${mobile} {
    animation-name: none;
  }

  & > * {
    animation-name: ${fadeIn};
    animation-fill-mode: both;
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

  width: 100%;
  margin 0 5%;

  ${mobile} {
    animation-name: ${fadeIn};
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

  ${phone} {
    font-size: 3rem;
  }
`;

export const GameResultContainer = styled.div<GameResultProps>`
  display: flex;
  justify-content: space-evenly;

  ${mobile} {
    height: 100%;
    flex-wrap: wrap;
    align-items: center;
  }

  ${GameResultChoice} {
    animation-duration: ${(props) => props.showResultDuration}s;
    animation-delay: ${(props) => props.showResultDelay}s;

    & > * {
      animation-duration: ${(props) => props.showHouseChoiceDuration}s;
      animation-delay: ${(props) => props.showHouseChoiceDelay}s;
    }
  }

  ${GameResult} {
    animation-duration: ${(props) => props.showResultDuration}s;
    animation-delay: ${(props) => props.showResultDelay}s;
  }

  ${(props) =>
    props.userWins ? GameResultUserChoice : GameResultHouseChoice} {
    ${GameResulChoicetWinner}
  }
`;
GameResultContainer.propTypes = gameResultPropTypes;

export const RulesImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const RulesImage = styled.img`
  width: 80%;
`;
