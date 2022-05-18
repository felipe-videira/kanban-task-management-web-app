import styled from "styled-components/macro";

const SCALE_ROTATION_45DEG = 1.4142;
const POINTING_UP_ROTATION = 45;
const POINTING_DOWN_ROTATION = 225;

type ContainerProps = {
  readonly size: number;
};

export const PolygonalListContainer = styled.div.attrs<ContainerProps>(
  (props) => ({
    style: {
      width: `${props.size}px`,
      height: `${props.size}px`,
    },
  })
)<ContainerProps>`
  position: relative;
  overflow: hidden;
`;

type ItemContainerProps = {
  readonly length: number;
  readonly itemSize: number;
  readonly size: number;
  readonly zIndex: number;
  readonly index: number;
  readonly polygonExteriorAngle: number;
  readonly pointingUp?: boolean | null;
};

export const PolygonalListItemContainer = styled.div.attrs<ItemContainerProps>(
  (props) => ({
    style: {
      zIndex: props.zIndex,
      transform: `rotate(${
        props.index === 0
          ? props.pointingUp
            ? POINTING_UP_ROTATION
            : POINTING_DOWN_ROTATION
          : props.polygonExteriorAngle
      }deg)`,
      ...(props.index === 0
        ? {
            top: `calc(50% - ${props.size}px / ${SCALE_ROTATION_45DEG} / 2)`,
            left: `calc(50% - ${props.size}px / ${SCALE_ROTATION_45DEG} / 2)`,
          }
        : {}),
      width: `calc(${props.size}px / ${SCALE_ROTATION_45DEG})`,
      height: `calc(${props.size}px / ${SCALE_ROTATION_45DEG})`,
    },
  })
)<ItemContainerProps>`
  position: absolute;
  top: 0;
  left: 0;

  ${(props) =>
    props.length >= 3
      ? `
        &::after {
            content: "";
            transform-origin: -${props.itemSize / (props.itemSize * 0.1)}px -${
          props.itemSize / (props.itemSize * 0.1)
        }px;
            position: absolute;
            height: calc(50% / (${props.length} / 4));
            width: ${props.itemSize * 0.1}px;
            background: rgba(0,0,0,0.2);
            transform: rotate(calc((90deg - ${
              props.polygonExteriorAngle
            }deg) / 2));
            top: calc(${props.itemSize}px / 2);
            left: calc(${props.itemSize}px / 2);
        }
      `
      : ""}
`;

type ItemContentProps = {
  readonly index: number;
  readonly pointingUp?: boolean | null;
  readonly zIndex: number;
  readonly itemSize: number;
  readonly polygonExteriorAngle: number;
};

export const PolygonalListItemContent = styled.div.attrs<ItemContentProps>(
  (props) => ({
    style: {
      zIndex: props.zIndex,
      width: `${props.itemSize}px`,
      height: `${props.itemSize}px`,
      transform: `rotate(calc(((${props.polygonExteriorAngle}deg * ${
        props.index
      }) + ${
        props.pointingUp ? POINTING_UP_ROTATION : POINTING_DOWN_ROTATION
      }deg) * -1))`,
    },
  })
)<ItemContentProps>`
  position: absolute;
  top: 0;
  left: 0;
`;
