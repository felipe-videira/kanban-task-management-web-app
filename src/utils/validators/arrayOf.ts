import { Measurable } from "./types";
import { Requireable, Validator } from "prop-types";

export const arrayOf = <T>(
  validator: Validator<T> | Requireable<T>
): Measurable<Array<T>> => {
  const arrayOfValidator: Measurable<Array<T>> = (
    props,
    propName,
    componentName,
    ...rest
  ) => {
    if (!Array.isArray(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof props[
          propName
        ]}\` supplied` + ` to \`${componentName}\`, expected \`Array\``
      );
    }
    let error: Error = Error();
    const hasError = (props[propName] as Array<T>).some((item) => {
      const result = validator(
        { [propName]: item },
        propName,
        componentName,
        ...rest
      );
      if (result !== null) {
        error = result;
        return true;
      }
      return false;
    });

    if (hasError) {
      return new Error(
        `One of the values of the prop \`${propName}\` supplied` +
          ` to \`${componentName}\` has an error, error: \`${error.message}\``
      );
    }
    return null;
  };

  arrayOfValidator.lenght = (min, max) => {
    const lengthValidator: Requireable<Array<T>> = (
      props,
      propName,
      componentName,
      ...rest
    ) => {
      const value = props[propName] as Array<T>;

      if (min && value.length < min) {
        return new Error(
          `Invalid prop \`${propName}\` with length \`${value.length}\` supplied` +
            ` to \`${componentName}\`, expected at least \`${min}\``
        );
      }

      if (max && value.length > max) {
        return new Error(
          `Invalid prop \`${propName}\` with length \`${value.length}\` supplied` +
            ` to \`${componentName}\`, expected a maximum of \`${max}\``
        );
      }

      return arrayOfValidator(props, propName, componentName, ...rest);
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

  arrayOfValidator.isRequired = (props, propName, componentName, ...rest) => {
    if (!props[propName]) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${props[propName]}\``
      );
    }

    return arrayOfValidator(props, propName, componentName, ...rest);
  };

  return arrayOfValidator;
};
