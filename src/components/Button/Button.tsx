import "./Button.scss";
import { bool, func, node, string } from "prop-types";
import { ReactNode } from "react";

function Button({
  children,
  onClick,
  className,
  block,
  primary,
  secondary,
  danger,
}: {
  children: ReactNode;
  onClick: () => void;
  className: string;
  block: boolean;
  primary: boolean;
  secondary: boolean;
  danger: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`base-button ${className} ${block ? "base-button--block" : ""}
      ${primary ? "base-button--primary" : ""}
      ${secondary ? "base-button--secondary" : ""}
      ${danger ? "base-button--danger" : ""}
      `}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
  className: string,
  block: bool,
  primary: bool,
  secondary: bool,
  danger: bool,
};

Button.defaultProps = {
  className: "",
  block: false,
  primary: true,
  secondary: false,
  danger: false,
};

export default Button;
