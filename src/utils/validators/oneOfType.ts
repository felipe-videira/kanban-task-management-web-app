import { Requireable, Validator, InferType } from "prop-types";
import { createIsRequired } from "./utils";

export const oneOfType = <T extends Validator<unknown>>(
  types: T[]
): Requireable<NonNullable<InferType<T>>> => {
  const oneOfTypeValidator: Requireable<NonNullable<InferType<T>>> = (
    props,
    propName,
    componentName,
    ...rest
  ) => {
    let lastError;
    let isOneOfTypes = false;

    for (let i = 0, len = types.length; i < len; i++) {
      const result = types[i](props, propName, componentName, ...rest);
      if (result !== null) {
        lastError = result;
      } else {
        isOneOfTypes = true;
        break;
      }
    }

    if (!isOneOfTypes) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`, last error: ${lastError?.message}`
      );
    }

    return null;
  };

  oneOfTypeValidator.isRequired = createIsRequired(oneOfTypeValidator);

  return oneOfTypeValidator;
};
