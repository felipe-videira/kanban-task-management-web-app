import { InferProps, node, oneOf } from "prop-types";
import { AriaAttributes } from "react";

export default function AriaLabel(
  props: InferProps<typeof AriaLabel.propTypes>
) {
  return (
    <div
      style={{ position: "absolute", color: "transparent" }}
      aria-live={props.live}
      aria-label={props.children.toString()}
    ></div>
  );
}

AriaLabel.propTypes = {
  children: node.isRequired,
  live: oneOf<AriaAttributes["aria-live"]>([
    "assertive",
    "off",
    "polite",
    undefined,
  ]).isRequired,
};
