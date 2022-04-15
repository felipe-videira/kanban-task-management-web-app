import styled from "styled-components/macro";
import { mobile } from "../../../utils/breakpoints";
import { fadeIn } from "./keyframes";

type ScoreProps = {
  readonly value: number;
};

type OptionsProps = {
  readonly size: number;
};

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
  width: 40%;
  border: 3px solid #ffffff59;
  border-radius: 20px;
  padding: 2.5% 5%;

  ${mobile} {
    width: 25%;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
  width: 10%;
`;

export const Score = styled.div.attrs<ScoreProps>((props) => ({
  key: props.value,
}))<ScoreProps>`
  animation: ${fadeIn} 1s linear 0s 1;
  animation-fill-mode: both;

  &::after {
    content: "${(props) => props.value}";
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
`}
`;

export * from "./gameResult";
export * from "./stepper";
