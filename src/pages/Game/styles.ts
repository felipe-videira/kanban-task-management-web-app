import { InferProps, number } from "prop-types";
import styled, { keyframes, css } from "styled-components/macro";
import Button from "../../components/Button";
import { LogoAltText, LogoImg } from "../../components/Logo";
import { OptionButton } from "../../components/Option/styles";
import _Stepper, { Step } from "../../components/Stepper";
import { mobile, phone, phoneSm, tablet } from "../../utils/breakpoints";
import { fadeIn } from "../../utils/keyframes";

const resultPropTypes = {
  showHouseChoiceDelay: number.isRequired,
  showHouseChoiceDuration: number.isRequired,
  showResultDelay: number.isRequired,
  showResultDuration: number.isRequired,
  winnerBackgroundEffectDelay: number.isRequired,
};

type ResultChoiceProps = {
  readonly size: number;
};

type ResultProps = {
  readonly userWins: boolean;
} & InferProps<typeof resultPropTypes> &
  ResultChoiceProps;

export const growAndfadeIn = keyframes`
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
    --result-rg-first: 0; --result-rg-first-border: 0;
    --result-rg-second: 0; --result-rg-second-border: 0;
    --result-rg-third: 0; --result-rg-third-border: 0;
    opacity: 0;
  }
  20% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0;
    --result-rg-second: 0; --result-rg-second-border: 0;
    --result-rg-third: 0; --result-rg-third-border: 0;
  }
  40% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0.045;
    --result-rg-second: 0.05; --result-rg-second-border: 0;
    --result-rg-third: 0; --result-rg-third-border: 0;
  }
  80% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0.045;
    --result-rg-second: 0.05; --result-rg-second-border: 0.02;
    --result-rg-third: 0.025; --result-rg-third-border: 0;
  }
  100% { 
    --result-rg-first: 0.075; --result-rg-first-border: 0.045;
    --result-rg-second: 0.05; --result-rg-second-border: 0.02;
    --result-rg-third: 0.025; --result-rg-third-border: 0.01;
  }
`;

export const Container = styled.div`
  animation: ${fadeIn} 2s linear 0s 1;
  animation-fill-mode: both;
  margin: 0 auto;
  display: grid;
  align-items: center;
  justify-content: center;
  flex: 1;
  grid-template:
  ". header ."
  ". game rules";
  grid-template-columns: 1fr 60% 1fr;
  grid-template-rows: max-content 1fr;
  width: 100%;
  padding: 2rem 0 0 0;

  ${mobile} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
`;

export const RulesButton = styled(Button).attrs(() => ({
  outlined: true,
  small: true,
}))`
  align-self: end;
  justify-self: end;
  grid-area: rules;
  margin: 0 7.5%;
  border-radius: 8px;
  min-width: 130px;
  width: auto;
  z-index: 2;

  ${mobile} {
    align-self: center;
    margin: 0;
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

  ${LogoImg}, ${LogoAltText} {
    flex: 0.25;
  }

  ${phone} {
    border-radius: 7px;
    padding: 10px;
  }
`;

export const ScoreValue = styled.div`
  color: ${(props) => props.theme.dark};
  animation: ${fadeIn} 1s linear 0s 1;
  animation-fill-mode: both;
  font-weight: bold;

  font-size: 4.5rem;
  line-height: 4.5rem;

  ${phone} {
    font-size: 2rem;
    line-height: 2rem;
  }

  ${phoneSm} {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  &:first-child {
    order: 1;
  }

  &:last-child {
    order: 3;
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
  padding: 2.5%;

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
  z-index: 1;
  height: 57.5vh;

  ${mobile} {
    min-height: 57.5vh;
    height: auto;
  }

  ${Step}[value="1"][value="${(props) => props.value}"] {
    display: flex;
    align-items: center;
  }
`;

export const Options = styled.div`
  margin: 0 auto;
`;

const ResultChoicetWinner = css<ResultProps>`
  position: relative;

  ${OptionButton} {
    position: relative;

    &:before {
      content: "";
      width: 300%;
      height: 300%;
      position: absolute;
      border-radius: 50%;
      top: -100%;
      left: -100%;
      z-index: -1;
      background-image: radial-gradient(
        circle,
        rgba(255, 255, 255, var(--result-rg-first)) 37.5%,
        rgba(255, 255, 255, var(--result-rg-first-border)) 37.5%,

        rgba(255, 255, 255, var(--result-rg-second)) 52.5%,
        rgba(255, 255, 255, var(--result-rg-second-border)) 52.5%,

        rgba(255, 255, 255, var(--result-rg-third)) 68.5%,
        rgba(255, 255, 255, var(--result-rg-third-border)) 68.5%,

        rgba(255, 255, 255, 0) 0%
      );
      animation-name: ${radialBackgroundEffect};
      animation-duration: 1.2s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-fill-mode: both;
      animation-timing-function: ease;
      animation-delay: ${(props) => props.winnerBackgroundEffectDelay}s;

      ${mobile} {
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background-image: radial-gradient(
          circle,
          rgba(255, 255, 255, var(--result-rg-first)) 43%,
          rgba(255, 255, 255, var(--result-rg-first-border)) 43%,
          rgba(255, 255, 255, var(--result-rg-second)) 57%,
          rgba(255, 255, 255, var(--result-rg-second-border)) 57%,
          rgba(255, 255, 255, var(--result-rg-third)) 100%,
          rgba(255, 255, 255, var(--result-rg-third-border)) 100%,
          rgba(255, 255, 255, 0) 0%
        );
      }
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
  position: absolute;
  top: -25%;

  ${mobile} {
    top: unset;
    bottom: -1rem;
    position: relative;
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
    order: 3;
  }
`;

export const ResultMessage = styled.p`
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 3.5rem;
  font-weight: bold;
  margin: 10px 0;

  ${mobile} {
    font-size: 4rem;
  }
`;

export const ResultContainer = styled.div<ResultProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 57.5vh;

  ${mobile} {
    width: 100%;
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
