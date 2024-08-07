import "./Dropdown.scss";
import { node, string } from "prop-types";
import { ReactNode } from "react";

export default function Dropdown({
  className,
  children,
  toggleIcon,
}: {
  className: string;
  children: ReactNode;
  toggleIcon: ReactNode;
}) {
  return (
    <div className={`dropdown ${className}`}>
      <input id="toggle-dropdown" type="checkbox" />
      <label htmlFor="toggle-dropdown" className="dropdown__label">
        {toggleIcon}
      </label>
      <div className="dropdown__content">{children}</div>
    </div>
  );
}

Dropdown.propTypes = {
  toggleIcon: node.isRequired,
  children: node.isRequired,
  className: string,
};

Dropdown.defaultProps = {
  className: "",
};
