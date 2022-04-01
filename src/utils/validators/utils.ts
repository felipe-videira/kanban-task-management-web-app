import { Validator } from "prop-types";

export const createIsRequired =
  <T>(chainValidation: Validator<T>): Validator<NonNullable<T>> =>
  (props, propName, componentName, ...rest) => {
    if (!props[propName]) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\``
      );
    }

    return chainValidation(props, propName, componentName, ...rest);
  };
