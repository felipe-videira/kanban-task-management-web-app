import { InferProps, number } from "prop-types";
import {
  string,
  image,
  color,
  func,
  arrayOf,
  oneOfType,
} from "../../utils/validators";
import { OptionButton, OptionIconContainer, OptionIcon } from "./styles";

interface OnClick {
  (name: string): void;
}

function Option(props: InferProps<typeof Option.propTypes>) {
  return (
    <OptionButton
      id={`option-${props.name}`}
      type="button"
      onClick={() => props.onClick(props.name)}
      size={props.size}
      background={props.color}
    >
      <OptionIconContainer size={props.size}>
        <OptionIcon src={props.icon} alt={props.name} size={props.size} />
      </OptionIconContainer>
    </OptionButton>
  );
}

Option.propTypes = {
  name: string.lenght(2).isRequired,
  icon: image.isRequired,
  color: oneOfType([color, arrayOf(color).lenght(2)]).isRequired,
  onClick: func<OnClick>().isRequired,
  size: number.isRequired,
};

export default Option;
