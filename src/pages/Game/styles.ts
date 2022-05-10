import { InferProps, number } from "prop-types";
import styled, { keyframes, css } from "styled-components/macro";
import Button from "../../components/Button";
import { OptionButton } from "../../components/Option/styles";
import _Stepper from "../../components/Stepper";
import { mobile, phone, phoneSm, tablet } from "../../utils/breakpoints";
import getFontSize from "../../utils/getFontSize";

const resultPropTypes = {
  showHouseChoiceDelay: number.isRequired,
  showHouseChoiceDuration: number.isRequired,
  showResultDelay: number.isRequired,
  showResultDuration: number.isRequired,
  winnerBackgroundEffectDelay: number.isRequired,
};

type ScoreValueProps = {
  readonly name: string;
};

type OptionsProps = {
  readonly size: number;
};

type ResultChoiceProps = {
  readonly size: number;
};

type ResultProps = {
  readonly userWins: boolean;
} & InferProps<typeof resultPropTypes> &
  ResultChoiceProps;

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
      rgba(255,255,255,0.2) 42.5%, 
      rgba(255,255,255,0.15) 42.5%, 
      rgba(255,255,255,0) 42.5%);
    opacity: 0;
  }
  100% {
    background: radial-gradient(circle, 
      rgba(255,255,255,0.2) 0%, 
      rgba(255,255,255,0.2) 42.5%, 
      rgba(255,255,255,0.15) 42.5%, 
      rgba(255,255,255,0.1) 55%, 
      rgba(255,255,255,0.05) 55%, 
      rgba(255,255,255,0.025) 75%, 
      rgba(255,255,255,0.0) 75%);
    opacity: 0.4;
  }
`;

export const Container = styled.div`
  animation: ${fadeIn} 2s linear 0s 1;
  animation-fill-mode: both;
  margin: 0 auto;
  display: grid;
  grid-template:
  ". header header header ."
  ". game game game ."
  ". . . . rules";
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto 45vh auto;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex: 1;

  ${mobile} {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: auto;
    gap: 0;
    margin: 0;
  }
}
`;

export const GoBackButton = styled(Button).attrs(() => ({
  icon: true,
  small: true,
}))`
  align-self: start;
  z-index: 2;
  transform: scale(0.75);
  display: block;

  ${tablet} {
    margin: 2%;
    height: 7.5%;
    width: 7.5%;
  }

  ${phone} {
    margin: 5%;
    height: 10%;
    width: 10%;
  }
`;

export const RulesButton = styled(Button).attrs(() => ({
  outlined: true,
  small: true,
}))`
  align-self: center;
  grid-area: rules;
  justify-self: end;
  margin: 7.5%;
  border-radius: 8px;
  min-width: 130px;
  width: auto;
  z-index: 2;

  ${mobile} {
    align-self: center;
    margin: 5% 0;
  }.
`;

export const Header = styled.div`
  border: 3px solid ${(props) => props.theme.contrast.low};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  padding: 2%;
  grid-area: header;
  width: 80%;
  margin: 0 auto;
  z-index: 2;
  flex-wrap: wrap;
  gap: 1rem 0;

  ${phone} {
    border-radius: 7px;
    padding: 10px;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
  line-height: 0.8;
  text-shadow: 1px 1px 5px rgb(0 0 0 / 25%);
  font-weight: normal;
  word-spacing: 100vh;
  flex: 0.5;
  font-size: ${(props) => getFontSize(props.children, 2)};
  margin: 0 0 0 25px;

  ${mobile} {
    margin-left: 15px;
  }
`;

export const ScoreValue = styled.div<ScoreValueProps>`
  font-size: 3rem;
  color: ${(props) => props.theme.dark};
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

export const Score = styled.div`
  background: ${(props) => props.theme.primary};
  min-width: 17.5%;
  border-radius: 7px;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4% 0;

  ${phone} {
    border-radius: 3px;
    max-width: 125px;
  }

  ${ScoreValue} + ${ScoreValue}::before {
    content: "x";
    font-size: 2rem;
    color: ${(props) => props.theme.dark};
    font-weight: bold;
    margin: 1rem;

    ${phone} {
      font-size: 1.5rem;
    }

    ${phoneSm} {
      font-size: 1.25rem;
    }
  }
`;

export const ScoreLabel = styled.h2`
  font-size: 1.2rem;
  color: ${(props) => props.theme.contrast.high};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-block: 0;
  font-weight: bold;

  ${phone} {
    font-size: 0.7rem;
  }

  ${phoneSm} {
    font-size: 0.5rem;
  }
`;

export const Stepper = styled(_Stepper)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: game;
  height: 60%;
  z-index: 1;

  ${mobile} {
    min-height: 60vh;
  }
`;

export const Options = styled.div<OptionsProps>`
  ${(props) => `
    height: ${props.size}px;
    width: ${props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;
    margin: 0 auto;
    overflow: hidden;
`}
`;

const ResultChoicetWinner = css<ResultProps>`
  position: relative;

  ${OptionButton} {
    position: relative;

    &:before {
      content: "";
      width: ${(props) => props.size * 2.5}px;
      height: ${(props) => props.size * 2.5}px;
      position: absolute;
      border-radius: 50%;
      top: -75%;
      left: -75%;
      z-index: -1;
      animation-name: ${radialBackgroundEffect};
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: both;
      animation-timing-function: ease;
      animation-delay: ${(props) => props.winnerBackgroundEffectDelay}s;
    }
  }
`;

export const ResultChoice = styled.div<ResultChoiceProps>`
  position: relative;
  margin: 0;
  flex-shrink: 0;
  background-size: ${(props) => `${props.size}px ${props.size}px}`}
  background-repeat: no-repeat;
  background-position: center bottom;
  background-image: radial-gradient(
    circle,
    rgba(0 0 0 / 0.2) 0%,
    rgba(0 0 0 / 0.2) 70%,
    rgba(0, 0, 0, 0) 70%
  );
  animation-fill-mode: both;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem 0;

  ${mobile} {
    flex: 1;
    flex-direction: column-reverse;
    background-position: center top;
  }
`;

export const ResultChoiceLabel = styled.p`
  text-transform: uppercase;
  left: 0;
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  letter-spacing: 2px;
  margin: 0;

  ${mobile} {
    top: unset;
    bottom: -3rem;
  }

  ${phoneSm} {
    font-size: 0.75rem;
  }

  ${phone} {
    font-size: 1rem;
  }

  ${tablet} {
    font-size: 2rem;
  }
`;

export const ResultUserChoice = styled(ResultChoice)`
  animation-name: ${moveLeft};

  ${mobile} {
    animation-name: none;
  }
`;

export const ResultHouseChoice = styled(ResultChoice)`
  animation-name: ${moveRight};
  order: 3;

  ${mobile} {
    animation-name: none;
  }

  & > * :not(${ResultChoiceLabel}) {
    animation-name: ${fadeIn};
    animation-fill-mode: both;
  }
`;

export const Result = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  animation-name: ${growAndfadeIn};
  animation-fill-mode: both;
  z-index: 1;

  margin 0 5%;

  ${mobile} {
    animation-name: ${fadeIn};
    margin 0 5%;
  	opacity: 0;
    order: 3;
    width: 60%;
  }
`;

export const ResultMessage = styled.p`
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 3.5rem;
  font-weight: bold;
  margin: 10px 0;

  @media only screen and (max-width: 820px), (max-width: 60rem) {
    font-size: 2rem;
  }
`;

export const ResultContainer = styled.div<ResultProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  ${mobile} {
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    min-height: 60vh;
    flex-wrap: wrap;
    align-items: center;
  }

  ${ResultChoice} {
    animation-duration: ${(props) => props.showResultDuration}s;
    animation-delay: ${(props) => props.showResultDelay}s;

    & > * {
      animation-duration: ${(props) => props.showHouseChoiceDuration}s;
      animation-delay: ${(props) => props.showHouseChoiceDelay}s;
    }
  }

  ${Result} {
    animation-duration: ${(props) => props.showResultDuration}s;
    animation-delay: ${(props) => props.showResultDelay}s;
  }

  ${(props) => (props.userWins ? ResultUserChoice : ResultHouseChoice)} {
    ${ResultChoicetWinner}
  }
`;
ResultContainer.propTypes = resultPropTypes;

export const RulesImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const RulesImage = styled.img`
  width: 80%;
`;
