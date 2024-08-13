import "./Button.scss";
import { bool, func, node, string } from "prop-types";
import { ReactNode } from "react";

function Button({
  children,
  type,
  onClick,
  className,
  block,
  primary,
  secondary,
  danger,
}: {
  children: ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  className: string;
  block: boolean;
  primary: boolean;
  secondary: boolean;
  danger: boolean;
}) {
  return (
    <button
      type={type}
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
  onClick: func,
  type: string,
  className: string,
  block: bool,
  primary: bool,
  secondary: bool,
  danger: bool,
};

Button.defaultProps = {
  type: "button",
  onClick: null,
  className: "",
  block: false,
  primary: true,
  secondary: false,
  danger: false,
};

export default Button;
