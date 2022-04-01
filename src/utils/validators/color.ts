import isColor from "../isColor";
import { Requireable } from "prop-types";

export const color: Requireable<string> = (props, propName, componentName) => {
  if (typeof props[propName] !== "string") {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof props[
        propName
      ]}\` supplied to \`${componentName}\`, expected \`string\``
    );
  }
  if (!isColor(props[propName])) {
    return new Error(
      `The prop \`${propName}\` requires a valid color in \`${componentName}\`, but its value is \`${props[propName]}\``
    );
  }

  return null;
};

color.isRequired = (props, propName, componentName, ...rest) => {
  if (props[propName]) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\``
    );
  }

  return color(props, propName, componentName, ...rest);
};
