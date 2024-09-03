import "./Modal.scss";
import { bool, func, node, string } from "prop-types";
import { ReactNode, useCallback } from "react";

function Modal({
  children,
  className,
  show,
  onClose,
}: {
  children: ReactNode;
  className: string;
  show: boolean;
  onClose: () => void;
}) {
  const _onClose = useCallback((evt) => {
    if (
      evt.target === evt.currentTarget &&
      (!evt.keyCode || evt.keyCode === 13)
    ) {
      onClose();
    }
  }, []);

  return (
    <div
      className={`modal ${show ? "modal--show" : ""}`}
      onClick={_onClose}
      onKeyDown={_onClose}
      role="dialog"
      tabIndex={0}
    >
      <div className={`modal__content ${className}`}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: node.isRequired,
  className: string,
  onClose: func.isRequired,
  show: bool,
};

Modal.defaultProps = {
  className: "",
  show: false,
};

export function ModalTitle({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return <h3 className={`modal__title ${className}`}>{children}</h3>;
}

ModalTitle.propTypes = {
  children: node.isRequired,
  className: string,
};

ModalTitle.defaultProps = {
  className: "",
};

export default Modal;
