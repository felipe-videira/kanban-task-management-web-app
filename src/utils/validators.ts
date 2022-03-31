import checkFile from "../services/checkFile";
import isColor from "./isColor";
import { Requireable } from "prop-types";

interface LengthValidator<T> {
  (min: number, max?: number): Requireable<T>;
}

interface Measurable<T> extends Requireable<T> {
  lenght: LengthValidator<T>;
}

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

export const func = <T>() => {
  const functionValidator: Requireable<T> = () => {
    return null;
  };

  functionValidator.isRequired = (props, propName, componentName, ...rest) => {
    if (!props[propName]) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\``
      );
    }

    return functionValidator(props, propName, componentName, ...rest);
  };

  return functionValidator;
};
