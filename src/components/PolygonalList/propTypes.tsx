import { elementType, number, object, arrayOf, bool } from "prop-types";

export default {
  data: arrayOf(object).isRequired,
  ItemComponent: elementType.isRequired,
  itemProps: object,
  itemSize: number.isRequired,
  pointingUp: bool,
};
