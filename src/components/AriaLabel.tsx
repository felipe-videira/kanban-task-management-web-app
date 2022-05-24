import { InferProps, node } from "prop-types";

export default function AriaLabel(
  props: InferProps<typeof AriaLabel.propTypes>
) {
  return (
    <div
      style={{ position: "absolute", color: "transparent" }}
      aria-label={props.children.toString()}
    ></div>
  );
}

AriaLabel.propTypes = {
  children: node.isRequired,
};
