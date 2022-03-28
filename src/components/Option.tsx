import { InferProps } from "prop-types";
import { useMemo } from "react";
import checkFile from "../services/checkFile";
import customValidator from "../utils/customValidator";
import isColor from "../utils/isColor";
import stringValidator from "../utils/stringValidator";

interface OnClick {
  (name: string): void;
}

function Option({
  name,
  icon,
  color,
  onClick,
}: InferProps<typeof Option.propTypes>) {
  const background = useMemo(
    () =>
      Array.isArray(color) ? `linear-gradient(${color.join(",")})` : color,
    [color]
  );

  return (
    <button type="button" onClick={() => onClick(name)} style={{ background }}>
      <img src={icon} />
    </button>
  );
}

Option.propTypes = {
  name: stringValidator(true, 2),
  icon: customValidator<string>((props, propName): Error | null => {
    if (!props[propName]) {
      return new Error(
        `The prop \`icon\` is marked as required in \`Option\`, but its value is \`${props[propName]}\``
      );
    }
    if (typeof props[propName] !== "string") {
      return new Error(
        `Invalid prop \`icon\` of type \`${typeof props[
          propName
        ]}\` supplied to \`Option\`, expected \`string\``
      );
    }
    if (!checkFile(props[propName])) {
      return new Error(
        `The prop \`icon\` requires a valid path to a image in \`Option\`, but its value is \`${props[propName]}\``
      );
    }

    return null;
  }),
  color: customValidator<string | Array<string>>(
    (props, propName): Error | null => {
      const value = props[propName];
      const isArray = Array.isArray(props[propName]);

      if (!value || (isArray && value.length === 0)) {
        return new Error(
          `The prop \`color\` is marked as required in \`Option\`, but its value is \`${value}\``
        );
      }
      if (
        typeof value !== "string" &&
        (!isArray || !value.every((item: unknown) => typeof item === "string"))
      ) {
        return new Error(
          `Invalid prop \`color\` of type \`${typeof value}\` supplied to \`Option\`, expected \`string\` or \`string[]\``
        );
      }
      if (
        (!isArray && !isColor(value)) ||
        (isArray && !value.every((item: unknown) => isColor(item as string)))
      ) {
        return new Error(
          `The prop \`color\` requires a valid color or array of colors in \`Option\`, but its value is \`${value}\``
        );
      }

      return null;
    }
  ),
  onClick: customValidator<OnClick>((props, propName): Error | null => {
    if (!props[propName]) {
      return new Error(
        `The prop \`onClick\` is marked as required in \`Option\`, but its value is \`${props[propName]}\``
      );
    }

    return null;
  }),
};

export default Option;
