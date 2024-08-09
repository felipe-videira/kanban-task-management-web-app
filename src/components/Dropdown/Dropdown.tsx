/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
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
      <div tabIndex={0} className="dropdown__label">
        {toggleIcon}
        <div className="dropdown__content">{children}</div>
      </div>
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
