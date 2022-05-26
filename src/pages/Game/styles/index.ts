import styled from "styled-components/macro";
import {
  growAndfadeIn,
  moveLeft,
  moveRight,
  radialBackgroundEffect,
} from "./keyframes";
import Button from "../../../components/Button";
import { LogoAltText, LogoImg } from "../../../components/Logo";
import { OptionButton } from "../../../components/Option/styles";
import _Stepper, { Step } from "../../../components/Stepper";
import { mobile, phone, phoneSm, tablet } from "../../../utils/breakpoints";
import { fadeIn } from "../../../utils/keyframes";

type ResultProps = {
  readonly userWins: boolean;
  readonly showHouseChoiceDelay: number;
  readonly showHouseChoiceDuration: number;
  readonly showResultDelay: number;
  readonly showResultDuration: number;
  readonly winnerBackgroundEffectDelay: number;
  readonly size: number;
};

export const Container = styled.div`
  animation: ${fadeIn} 0.2s linear 0s 1 normal both;
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
  padding: 2rem 0 1rem;
  z-index: 0;
  
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
  margin: 0 10%;
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
  width: 70%;
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
  animation: ${fadeIn} 1s linear 0s 1 normal both;
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
  grid-area: game;
  z-index: 1;
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: stretch;

  ${Step} {
    height: unset;
  }
`;

export const Options = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

export const RulesImageContainer = styled.div`
  svg {
    width: 100%;
  }
`;

const ResultChoiceLabel = styled.p`
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  white-space: nowrap;
  letter-spacing: 3px;
  margin: 0;
  animation-fill-mode: both;

  ${mobile} {
    display: flex;
    align-items: center;
    justify-content: center;
    animation-name: none !important;
    letter-spacing: 2px;
  }

  ${tablet} {
    font-size: 1.5rem;
  }

  ${phone} {
    font-size: 0.9rem;
  }

  ${phoneSm} {
    font-size: 0.65rem;
  }
`;

export const ResultUserChoiceLabel = styled(ResultChoiceLabel)`
  animation-name: ${moveLeft};
  grid-area: 1 / 1;

  ${mobile} {
    grid-area: 2 / 1;
  }
`;

export const ResultHouseChoiceLabel = styled(ResultChoiceLabel)`
  animation-name: ${moveRight};
  grid-area: 1 / 3;

  ${mobile} {
    grid-area: 2 / 2;
  }
`;

const ResultChoice = styled.div<{ readonly size: number }>`
  background: radial-gradient(
      circle,
      rgba(0 0 0 / 0.1) 60%,
      rgba(0 0 0 / 0) 60%
    )
    center no-repeat;
  animation-fill-mode: both;
  border-radius: 50%;

  ${mobile} {
    animation-name: none !important;
  }
`;

export const ResultUserChoice = styled(ResultChoice)`
  animation-name: ${moveLeft};
  grid-area: 2 / 1;

  ${mobile} {
    grid-area: 1 / 1;
  }
`;

export const ResultHouseChoice = styled(ResultChoice)`
  animation-name: ${moveRight};
  grid-area: 2 / 3;

  ${mobile} {
    grid-area: 1 / 2;
  }

  ${OptionButton} {
    animation-name: ${fadeIn};
    animation-fill-mode: both;
  }
`;

export const Result = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation-name: ${growAndfadeIn};
  animation-fill-mode: both;
  z-index: 1;
  grid-area: 2 / 2;
  width: 100%;

  ${mobile} {
    animation-name: ${fadeIn};
    grid-area: 3 / 1 / 3 / span 2;
  }
`;

export const ResultMessage = styled.p`
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 4rem;
  font-weight: bold;
  margin: 0 0 15px 0;

  ${mobile} {
    margin: 0 0 10px 0;
  }

  ${tablet} {
    font-size: 4rem;
  }

  ${phone} {
    font-size: 3.5rem;
  }

  ${phoneSm} {
    font-size: 3rem;
  }
`;

export const RetryButton = styled(Button)`
  &:hover {
    color: hsl(349, 70%, 56%);
  }

  ${mobile} {
    width: 60%;
    max-width: 280px;
  }

  ${phoneSm} {
    font-size: 0.8rem;
  }
`;

export const ResultContainer = styled.div<ResultProps>`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: 0.6fr max-content / max-content 20% max-content;
  place-items: center;
  place-content: start center;
  gap: 0 10%;

  ${mobile} {
    grid-template: max-content max-content 0.75fr / 1fr 1fr;
    place-content: end;
    gap: 5%;
  }

  ${Result}, ${ResultChoice}, ${ResultChoiceLabel} {
    animation-duration: ${(props) => props.showResultDuration}s;
    animation-delay: ${(props) => props.showResultDelay}s;
  }

  ${ResultChoice} {
    ${OptionButton} {
      animation-duration: ${(props) => props.showHouseChoiceDuration}s;
      animation-delay: ${(props) => props.showHouseChoiceDelay}s;
    }
  }

  ${(props) => (props.userWins ? ResultUserChoice : ResultHouseChoice)} {
    position: relative;

    ${OptionButton} {
      position: relative;

      &:before {
        content: "";
        width: 275%;
        height: 275%;
        position: absolute;
        border-radius: 50%;
        top: -87.5%;
        left: -87.5%;
        z-index: -1;
        background-image: radial-gradient(
          circle,
          rgba(255, 255, 255, var(--result-rg-first)) 40%,
          rgba(255, 255, 255, var(--result-rg-first-border)) 40%,
          rgba(255, 255, 255, var(--result-rg-second)) 55%,
          rgba(255, 255, 255, var(--result-rg-second-border)) 55%,
          rgba(255, 255, 255, var(--result-rg-third)) 70%,
          rgba(255, 255, 255, var(--result-rg-third-border)) 70%,
          rgba(255, 255, 255, 0) 0%
        );
        animation: ${radialBackgroundEffect} 1.2s ease
          ${(props) => props.winnerBackgroundEffectDelay}s infinite alternate
          both;

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
  }
`;
