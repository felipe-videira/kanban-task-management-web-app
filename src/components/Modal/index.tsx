import { bool, func, InferProps, node, string } from "prop-types";
import { useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
} from "./styles";
import { CloseIcon } from "../../icons";

const ANIMATION_DURATION = 0.4;

export default function Modal(props: InferProps<typeof Modal.propTypes>) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.show) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, ANIMATION_DURATION * 1000);
    }
  }, [props.show]);

  return show ? (
    <ModalOverlay
      show={props.show}
      onClick={props.onClose}
      animationDuration={ANIMATION_DURATION}
    >
      {props.show ? (
        <ModalContainer
          onClick={(evt) => evt.stopPropagation()}
          role="dialog"
          tabIndex={0}
          onBlur={props.onClose}
        >
          <ModalTitle>{props.title}</ModalTitle>
          <ModalCloseButton
            type="button"
            aria-label={props.closeButtonAriaLabel}
            onClick={props.onClose}
          >
            <CloseIcon />
          </ModalCloseButton>

          <ModalContent>{props.children}</ModalContent>
        </ModalContainer>
      ) : null}
    </ModalOverlay>
  ) : null;
}

Modal.propTypes = {
  show: bool.isRequired,
  title: string,
  children: node,
  onClose: func.isRequired,
  closeButtonAriaLabel: string.isRequired,
};
