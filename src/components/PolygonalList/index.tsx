import { elementType, InferProps, number, object, arrayOf } from "prop-types";
import { useMemo } from "react";
import { Container, ItemContainer, ItemContent } from "./styles";

const propTypes = {
  data: arrayOf(object).isRequired,
  ItemComponent: elementType.isRequired,
  itemProps: object,
  itemSize: number.isRequired,
};

function Item(props: InferProps<typeof Item.propTypes>) {
  if (props.index >= props.length) return null;
  const zIndex = props.length - props.index;

  return (
    <ItemContainer
      zIndex={zIndex}
      listLength={props.length}
      contentSize={props.itemSize}
    >
      <ItemContent
        zIndex={zIndex}
        currentIndex={props.index}
        listLength={props.length}
        contentSize={props.itemSize}
      >
        <props.ItemComponent
          {...props.data[props.index]}
          {...props.itemProps}
        />
      </ItemContent>
      <Item
        data={props.data}
        index={props.index + 1}
        ItemComponent={props.ItemComponent}
        itemProps={props.itemProps}
        itemSize={props.itemSize}
        length={props.length}
      />
    </ItemContainer>
  );
}

Item.propTypes = {
  ...propTypes,
  index: number.isRequired,
  length: number.isRequired,
};

function PolygonalList(props: InferProps<typeof PolygonalList.propTypes>) {
  const length = useMemo(() => props.data.length, [props.data]);
  const scaledSize = useMemo(() => props.size / 1.4142, [props.size]);

  return (
    <Container size={scaledSize}>
      <Item
        index={0}
        data={props.data}
        ItemComponent={props.ItemComponent}
        itemProps={props.itemProps}
        itemSize={props.itemSize}
        length={length}
      />
    </Container>
  );
}

PolygonalList.propTypes = {
  ...propTypes,
  size: number.isRequired,
};

export default PolygonalList;
