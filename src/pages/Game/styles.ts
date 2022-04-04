import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  padding: 5%;
  gap: 100px;
  overflow: hidden;
`;

export const Score = styled.div`
  height: 100px;
  width: 90%;
  border: 1px solid #fff;
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
`}
`;
