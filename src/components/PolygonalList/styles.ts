import styled from "styled-components/macro";

const SCALE_ROTATION_45DEG = 1.4142;

interface ContainerProps {
  readonly size: number;
  readonly pointingUp?: boolean | null;
}

export const PolygonalListContainer = styled.div.attrs<ContainerProps>(
  (props) => ({
    size: `${props.size / SCALE_ROTATION_45DEG}px`,
  })
)<ContainerProps>`
  ${(props) => `
    transform: rotate(${props.pointingUp ? "45" : "225"}deg);
    width: ${props.size};
    height: ${props.size};
`}
`;

interface ItemContainerProps {
  readonly length: number;
  readonly itemSize: number;
  readonly zIndex: number;
  readonly origin?: string;
}

export const PolygonalListItemContainer = styled.div.attrs<ItemContainerProps>(
  (props) => ({
    style: {
      zIndex: props.zIndex,
      transform: `rotate(${360 / props.length}deg)`,
    },
    origin: `-${props.itemSize / (props.itemSize * 0.1)}px`,
  })
)<ItemContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${(props) =>
    props.length >= 3 &&
    `
      &::after {
          content: "";
          position: absolute;
          transform-origin: ${props.origin} ${props.origin};
          height: calc(100% / (${props.length}/ 4));
          width: ${props.itemSize * 0.1}px;
          background: rgba(0,0,0,0.2);
          top: 0;
          left: 0;
          transform: rotate(${(90 - 360 / props.length) / 2}deg);
      }
    `}
`;

interface ItemContentProps extends ItemContainerProps {
  readonly index: number;
  readonly pointingUp?: boolean | null;
}

export const PolygonalListItemContent = styled.div.attrs<ItemContentProps>(
  (props) => {
    const width = `${props.itemSize}px`;
    const top = `${(props.itemSize / 2) * -1}px`;
    const rotationDegrees =
      (360 / props.length) * (props.index + 1) + (props.pointingUp ? 45 : 225);
    return {
      style: {
        zIndex: props.zIndex,
        top,
        left: top,
        width,
        height: width,
        transform: `rotate(-${rotationDegrees}deg)`,
      },
    };
  }
)<ItemContentProps>`
  position: absolute;
`;
