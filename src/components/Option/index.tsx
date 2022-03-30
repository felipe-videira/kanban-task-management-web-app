import { InferProps, number } from "prop-types";
import { useMemo } from "react";
import stringValidator from "../../utils/stringValidator";
import { iconValidator, colorValidator, onClickValidator } from "./validators";

import "./style.scss";

function Option({
  name,
  icon,
  color,
  size,
  onClick,
}: InferProps<typeof Option.propTypes>) {
  const style = useMemo(
    () => ({
      background: Array.isArray(color)
        ? `linear-gradient(${color.join(",")})`
        : color,
      "--size": `${size}px`,
    }),
    [color, size]
  );

  return (
    <button
      type="button"
      onClick={() => onClick(name)}
      className="option"
      style={style}
    >
      <div className="option__icon-container">
        <img
          className="option__icon"
          src={icon}
          width="60px"
          height="60px"
          alt={name}
        />
      </div>
    </button>
  );
}

Option.propTypes = {
  name: stringValidator(true, 2),
  icon: iconValidator,
  color: colorValidator,
  onClick: onClickValidator,
  size: number.isRequired,
};

export default Option;
