import styled from "styled-components";

interface ContainerProps {
  readonly size: number;
}

export const Container = styled.div<ContainerProps>`
  ${(props) => `
    transform: rotate(45deg);
    width: ${props.size}px;
    height: ${props.size}px;
`}
`;

interface ItemContainerProps {
  readonly listLength: number;
  readonly contentSize: number;
  readonly zIndex: number;
}

export const ItemContainer = styled.div<ItemContainerProps>`
  z-index: ${(props) => props.zIndex};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: ${(props) => `rotate(calc(360deg / ${props.listLength}))`};

  &::after {
    ${(props) => `
      ${props.listLength < 3 ? "display: none;" : ""}
      content: "";
      position: absolute;
      transform-origin: ${
        (props.contentSize / (props.contentSize * 0.1)) * -1
      }px ${(props.contentSize / (props.contentSize * 0.1)) * -1}px;
      height: calc(100% / (${props.listLength}/ 4));
      width: ${props.contentSize * 0.1}px;
      background: rgba(0,0,0,0.2);
      top: 0;
      left: 0;
      transform: rotate(${(90 - 360 / props.listLength) / 2}deg);
    `}
  }
`;

interface ItemContentProps extends ItemContainerProps {
  readonly currentIndex: number;
}

export const ItemContent = styled.div<ItemContentProps>`
  ${(props) => `
    z-index: ${props.zIndex};
    transform: rotate(${
      ((360 / props.listLength) * (props.currentIndex + 1) + 45) * -1
    }deg);
    position: absolute;
    top: calc(${props.contentSize}px / 2 * -1);
    left: calc(${props.contentSize}px / 2 * -1);
    width: ${props.contentSize}px;
    height: ${props.contentSize}px;
`}
`;
