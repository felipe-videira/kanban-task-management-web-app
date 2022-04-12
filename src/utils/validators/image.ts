import checkFile from "../checkFile";
import { Requireable } from "prop-types";

export const image: Requireable<string> = (props, propName, componentName) => {
  if (typeof props[propName] !== "string") {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof props[
        propName
      ]}\` supplied to \`${componentName}\`, expected \`string\``
    );
  }
  if (!checkFile(props[propName])) {
    return new Error(
      `The prop \`${propName}\` requires a valid path to a image in \`${componentName}\`, but its value is \`${props[propName]}\``
    );
  }

  return null;
};

image.isRequired = (props, propName, componentName, ...rest) => {
  if (!props[propName]) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\``
    );
  }

  return image(props, propName, componentName, ...rest);
};
