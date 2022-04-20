import styled, { keyframes, css } from "styled-components/macro";
import { mobile, phone, phoneSm, tablet } from "../../utils/breakpoints";
import getFontSize from "../../utils/getFontSize";

const SHOW_HOUSE_CHOICE_DURATION_RATIO = 0.2;
const SHOW_HOUSE_CHOICE_DELAY_RATIO = 0.45;
const SHOW_RESULT_DURATION_RATIO = 0.55;
const SHOW_RESULT_DELAY_RATIO = 0.55;

type ScoreProps = {
  readonly label: string;
  readonly user: number;
  readonly house: number;
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
    transform: translateX(70%);
  }
  to {
    transform: translateX(0);
  }
`;

const moveRight = keyframes`
  from  {
    transform: translateX(-70%);
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
    opacity: 0.3;
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
  line-height: 0.9;
  text-shadow: 1px 1px 5px rgb(0 0 0 / 25%);
  padding-left: 10px;
  width: 10%;
  margin: 0;
  font-size: ${(props) => getFontSize(props.children, 3)};
`;

export const Score = styled.div.attrs<ScoreProps>((props) => ({
  key: `${props.user}-${props.house}`,
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
  gap: 5px;

  &::before {
    content: "${(props) => props.label}";
    font-size: 1rem;
    color: hsl(229, 64%, 46%);
    text-transform: uppercase;
    letter-spacing: 1.5px;

    ${phone} {
      font-size: 0.7rem;
    }

    ${phoneSm} {
      font-size: 0.5rem;
    }
  }

  &::after {
    content: "${(props) => `${props.user} - ${props.house}`}";
    font-size: 2.5rem;
    color: hsl(229, 25%, 31%);
    margin: -5px;
    font-weight: normal;

    ${phone} {
      font-size: 1.5rem;
    }

    ${phoneSm} {
      font-size: 1.25rem;
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
  z-index: 1;

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
    animation-delay: ${(props) => props.delayInSecs * 0.6}s;
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

  animation-fill-mode: both;
  border-radius: 50%;
`;

export const GameResultUserChoice = styled(GameResultChoice)`
  animation-name: ${moveLeft};
`;

export const GameResultHouseChoice = styled(GameResultChoice)`
  animation-name: ${moveRight};

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
    animation-duration: ${(props) =>
      props.delayInSecs * SHOW_RESULT_DURATION_RATIO * 0.15}s;
    animation-delay: ${(props) =>
      props.delayInSecs * SHOW_RESULT_DELAY_RATIO * 0.95}s;

    & > * {
      animation-duration: ${(props) =>
        props.delayInSecs * SHOW_HOUSE_CHOICE_DURATION_RATIO}s;
      animation-delay: ${(props) =>
        props.delayInSecs * SHOW_HOUSE_CHOICE_DELAY_RATIO}s;
    }
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

export const RulesImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const RulesImage = styled.img`
  width: 80%;
`;
