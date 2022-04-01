import { Requireable } from "prop-types";

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
