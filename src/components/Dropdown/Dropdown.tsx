import "./Dropdown.scss";
import { node, string } from "prop-types";
import { ReactNode } from "react";

function DropdownOptions({
  className,
  children,
  toggleIcon,
}: {
  className: string;
  children: ReactNode;
  toggleIcon: ReactNode;
}) {
  return (
    <div className={`opts-dropdown ${className}`}>
      <input id="toggle-opts-dropdown" type="checkbox" />
      <label htmlFor="toggle-opts-dropdown" className="opts-dropdown__label">
        {toggleIcon}
      </label>
      <div className="opts-dropdown__content">{children}</div>
    </div>
  );
}

DropdownOptions.propTypes = {
  toggleIcon: node.isRequired,
  children: node.isRequired,
  className: string,
};

DropdownOptions.defaultProps = {
  className: "",
};

export default DropdownOptions;
