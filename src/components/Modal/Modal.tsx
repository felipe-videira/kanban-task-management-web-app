import "./Modal.scss";
import { bool, node, string } from "prop-types";
import { ReactNode } from "react";

function Modal({
  children,
  className,
  show,
}: {
  children: ReactNode;
  className: string;
  show: boolean;
}) {
  return (
    <div className={`modal ${show ? "modal--show" : ""}`}>
      <div className={`modal__content ${className}`}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: node.isRequired,
  className: string,
  show: bool,
};

Modal.defaultProps = {
  className: "",
  show: false,
};

export default Modal;
