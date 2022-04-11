import { InferProps, number } from "prop-types";
import {
  PolygonalListItemContainer as ItemContainer,
  PolygonalListItemContent as ItemContent,
} from "./styles";
import propTypes from "./propTypes";

function PolygonalListItem(
  props: InferProps<typeof PolygonalListItem.propTypes>
) {
  const zIndex = props.length - props.index;

  return (
    <ItemContainer
      zIndex={zIndex}
      length={props.length}
      itemSize={props.itemSize}
      polygonExteriorAngle={props.polygonExteriorAngle}
    >
      <ItemContent
        zIndex={zIndex}
        index={props.index}
        length={props.length}
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

PolygonalListItem.propTypes = {
  ...propTypes,
  index: number.isRequired,
  length: number.isRequired,
  polygonExteriorAngle: number.isRequired,
};

export default PolygonalListItem;
