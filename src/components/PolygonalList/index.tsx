import { InferProps, number } from "prop-types";
import { useMemo } from "react";
import { PolygonalListContainer as Container } from "./styles";
import Item from "./PolygonalListItem";
import propTypes from "./propTypes";

function PolygonalList(props: InferProps<typeof PolygonalList.propTypes>) {
  const length = useMemo(() => props.data.length, [props.data]);
  const polygonExteriorAngle = useMemo(() => 360 / length, [length]);

  return length > 0 ? (
    <Container size={props.size} pointingUp={props.pointingUp}>
      <Item
        index={0}
        data={props.data}
        ItemComponent={props.ItemComponent}
        itemProps={props.itemProps}
        itemSize={props.itemSize}
        length={length}
        pointingUp={props.pointingUp}
        polygonExteriorAngle={polygonExteriorAngle}
      />
    </Container>
  ) : null;
}

PolygonalList.propTypes = {
  ...propTypes,
  size: number.isRequired,
};

PolygonalList.defaultProps = {
  pointingUp: true,
};

export default PolygonalList;
