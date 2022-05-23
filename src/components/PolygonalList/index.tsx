import { useMemo } from "react";
import { InferProps, number, elementType, object, bool } from "prop-types";
import { arrayOf } from "../../utils/validators";
import {
  PolygonalListContainer as Container,
  PolygonalListItemContainer as ItemContainer,
  PolygonalListItemContent as ItemContent,
} from "./styles";

export function PolygonalListItem(
  props: InferProps<typeof PolygonalList.propTypes> & {
    readonly index: number;
    readonly length: number;
    readonly polygonExteriorAngle: number;
  }
) {
  const zIndex = useMemo(
    () => props.length - props.index,
    [props.length, props.index]
  );

  return (
    <ItemContainer
      length={props.length}
      itemSize={props.itemSize}
      size={props.size}
      zIndex={zIndex}
      index={props.index}
      polygonExteriorAngle={props.polygonExteriorAngle}
      pointingUp={props.pointingUp}
    >
      <ItemContent
        zIndex={zIndex}
        index={props.index}
        itemSize={props.itemSize}
        pointingUp={props.pointingUp}
        polygonExteriorAngle={props.polygonExteriorAngle}
      >
        <props.ItemComponent
          {...props.data[props.index]}
          {...props.itemProps}
        />
      </ItemContent>

      {props.index < props.length - 1 && (
        <PolygonalListItem {...props} index={props.index + 1} />
      )}
    </ItemContainer>
  );
}

function PolygonalList(props: InferProps<typeof PolygonalList.propTypes>) {
  const length = useMemo(() => props.data.length, [props.data]);
  const polygonExteriorAngle = useMemo(() => 360 / length, [length]);

  return length > 0 ? (
    <Container size={props.size}>
      <PolygonalListItem
        index={0}
        data={props.data}
        ItemComponent={props.ItemComponent}
        itemProps={props.itemProps}
        itemSize={props.itemSize}
        length={length}
        pointingUp={props.pointingUp}
        size={props.size}
        polygonExteriorAngle={polygonExteriorAngle}
      />
    </Container>
  ) : null;
}

PolygonalList.propTypes = {
  data: arrayOf(object).lenght(3).isRequired,
  ItemComponent: elementType.isRequired,
  itemProps: object,
  itemSize: number.isRequired,
  pointingUp: bool,
  size: number.isRequired,
};

PolygonalList.defaultProps = {
  pointingUp: true,
};

export default PolygonalList;
