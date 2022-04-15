import styled from "styled-components/macro";

type StyleProps = {
  readonly size: number;
};

type ButtonProps = {
  readonly background: string | string[];
} & StyleProps;

export const OptionButton = styled.button.attrs<ButtonProps>((props) => {
  let background;

  if (Array.isArray(props.background) && props.background.length > 1) {
    background = `linear-gradient(${props.background.join(",")})`;
  } else if (Array.isArray(props.background)) {
    background = props.background[0];
  } else {
    background = props.background;
  }

  return {
    size: `${props.size * 0.04}px`,
    background,
  };
})<ButtonProps>`
  border-radius: 50%;
  padding: ${(props) => `12% 12% calc(12% + ${props.size})`};
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: ${(props) => `inset 0px -${props.size} 0px 0px rgb(0 0 0 / 30%)`};
  cursor: pointer;
  background: ${(props) => props.background};

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
