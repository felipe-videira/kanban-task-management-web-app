import { Measurable } from "./types";
import { Requireable } from "prop-types";

export const string: Measurable<string> = (props, propName, componentName) => {
  if (typeof props[propName] !== "string") {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof props[
        propName
      ]}\` supplied` + ` to \`${componentName}\`, expected \`string\``
    );
  }

  return null;
};

string.lenght = (min, max) => {
  const lengthValidator: Requireable<string> = (
    props,
    propName,
    componentName,
    ...rest
  ) => {
    const value = props[propName] as string;

    if (min && value.length < min) {
      return new Error(
        `Invalid prop \`${propName}\` with length \`${value.length}\` supplied` +
          ` to \`${componentName}\`, expected at least \`${min}\` characters`
      );
    }

    if (max && value.length > max) {
      return new Error(
        `Invalid prop \`${propName}\` with length \`${value.length}\` supplied` +
          ` to \`${componentName}\`, expected a maximum of \`${max}\` characters`
      );
    }

    return string(props, propName, componentName, ...rest);
  };

  lengthValidator.isRequired = (props, propName, componentName, ...rest) => {
    if (!props[propName]) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\``
      );
    }

    return lengthValidator(props, propName, componentName, ...rest);
  };

  return lengthValidator;
};

string.isRequired = (props, propName, componentName, ...rest) => {
  if (!props[propName]) {
    return new Error(
      `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\``
    );
  }

  return string(props, propName, componentName, ...rest);
};
