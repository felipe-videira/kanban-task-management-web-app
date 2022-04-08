import styled from "styled-components/macro";

interface StyleProps {
  readonly size: number;
}

interface ButtonProps extends StyleProps {
  readonly background: string | string[];
}

export const OptionButton = styled.button.attrs<ButtonProps>((props) => ({
  size: `${props.size * 0.04}px`,
}))<ButtonProps>`
  border-radius: 50%;
  padding: ${(props) => `12% 12% calc(12% + ${props.size})`};
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: ${(props) => `inset 0px -${props.size} 0px 0px rgb(0 0 0 / 30%)`};
  cursor: pointer;
  background: ${(props) =>
    Array.isArray(props.background)
      ? `linear-gradient(${props.background.join(",")})`
      : props.background};

  &:active {
    box-shadow: none;
    padding: 12%;
    transform: ${(props) => `translateY(${props.size})`};
  }
`;

export const OptionIconContainer = styled.div<StyleProps>`
  box-shadow: ${(props) =>
    `inset 0px ${props.size * 0.025}px 0px 0px rgb(0 0 0 / 20%)`};
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

export const OptionIcon = styled.img.attrs<StyleProps>((props) => ({
  size: `${props.size * 0.35}px`,
}))<StyleProps>`
  object-fit: contain;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;
