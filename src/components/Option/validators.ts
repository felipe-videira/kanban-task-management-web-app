import checkFile from "../../services/checkFile";
import customValidator from "../../utils/customValidator";
import isColor from "../../utils/isColor";

interface OnClick {
  (name: string): void;
}

export const iconValidator = customValidator<string>((props, propName) => {
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
});

export const colorValidator = customValidator<string | Array<string>>(
  (props, propName) => {
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
);

export const onClickValidator = customValidator<OnClick>((props, propName) => {
  if (!props[propName]) {
    return new Error(
      `The prop \`onClick\` is marked as required in \`Option\`, but its value is \`${props[propName]}\``
    );
  }

  return null;
});
