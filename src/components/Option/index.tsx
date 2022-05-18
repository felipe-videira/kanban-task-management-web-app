import { useMemo } from "react";
import { bool, InferProps, number } from "prop-types";
import {
  string,
  image,
  color,
  func as funcWithType,
  arrayOf,
  oneOfType,
  ref,
} from "../../utils/validators";
import { OptionButton, OptionIconContainer, OptionIcon } from "./styles";

interface OnClick {
  (name: string): void;
}

interface GetAltText {
  (name: string): string;
}

function Option(props: InferProps<typeof Option.propTypes>) {
  const alt = useMemo(
    () =>
      props.alt
        ? typeof props.alt === "string"
          ? props.alt
          : props.alt(props.name)
        : "",
    [props.alt, props.name]
  );

  return (
    <OptionButton
      id={props.name}
      name={props.name}
      type="button"
      onClick={() => props.onClick && props.onClick(props.name)}
      size={props.size}
      background={props.color}
      aria-hidden={props.ariaHidden || false}
      disabled={!props.onClick || props.disabled || false}
      ref={props.forwardRef}
    >
      <OptionIconContainer size={props.size}>
        <OptionIcon src={props.icon} alt={alt} size={props.size} />
      </OptionIconContainer>
    </OptionButton>
  );
}

Option.propTypes = {
  name: string.lenght(2).isRequired,
  icon: image.isRequired,
  color: oneOfType([color, arrayOf(color).lenght(2)]).isRequired,
  onClick: funcWithType<OnClick>(),
  size: number.isRequired,
  alt: oneOfType([string.lenght(2), funcWithType<GetAltText>()]).isRequired,
  ariaHidden: bool,
  disabled: bool,
  forwardRef: ref,
};

export default Option;
