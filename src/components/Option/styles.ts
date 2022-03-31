import styled from "styled-components";

interface StyleProps {
  readonly size: number;
}

interface ButtonProps extends StyleProps {
  readonly background: string | string[];
}

export const Button = styled.button<ButtonProps>`
  border-radius: 50%;
  padding: ${(props) => `12% 12% calc(12% + (${props.size}px * 0.04))`};
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: ${(props) =>
    `inset 0px calc((${props.size}px * 0.04) * -1) 0px 0px rgb(0 0 0 / 30%)`};
  cursor: pointer;
  background: ${(props) =>
    Array.isArray(props.background)
      ? `linear-gradient(${props.background.join(",")})`
      : props.background};

  &:active {
    box-shadow: none;
    padding: 12%;
    transform: ${(props) => `translateY(calc(${props.size}px * 0.04))`};
  }
`;

export const IconContainer = styled.div<StyleProps>`
  box-shadow: ${(props) =>
    `inset 0px calc(${props.size}px * 0.025) 0px 0px rgb(0 0 0 / 20%)`};
  background: #fff;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f0f0f0;
  }
`;

export const Icon = styled.img<StyleProps>`
  object-fit: contain;
  width: ${(props) => `calc(${props.size}px * 0.35)`};
  height: ${(props) => `calc(${props.size}px * 0.35)`};
`;
