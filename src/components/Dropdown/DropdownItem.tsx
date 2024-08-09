import "./Dropdown.scss";
import { func, node, string } from "prop-types";
import { ReactNode } from "react";

export default function DropdownItem({
  className,
  children,
  onClick,
}: {
  className: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`dropdown-item ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

DropdownItem.propTypes = {
  children: node.isRequired,
  className: string,
  onClick: func,
};

DropdownItem.defaultProps = {
  className: "",
  onClick: null,
};
