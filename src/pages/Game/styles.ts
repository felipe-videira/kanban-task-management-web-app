import styled from "styled-components/macro";
import { mobile } from "../../utils/breakpoints";

interface StyleProps {
  readonly size: number;
}
export const Container = styled.div`
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

export const Score = styled.div``;

export const Options = styled.div<StyleProps>`
  ${(props) => `
    height: ${props.size}px;
    width: ${props.size}px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;
`}
`;
