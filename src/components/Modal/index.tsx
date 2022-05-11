import { bool, func, InferProps, node, string } from "prop-types";
import { SyntheticEvent, useEffect, useState } from "react";
import isMobile from "../../utils/isScreenMobileSize";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
} from "./styles";
import { CloseIcon } from "../../icons";

const ANIMATION_DURATION = 0.4;

export default function Modal(props: InferProps<typeof Modal.propTypes>) {
  const [show, setShow] = useState(false);

  function onContainerClick(evt: SyntheticEvent) {
    if (!isMobile()) {
      evt.stopPropagation();
    }
  }

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
      onClick={props.onChange}
      animationDuration={ANIMATION_DURATION}
    >
      <ModalContainer
        onClick={onContainerClick}
        role="dialog"
        tabIndex={0}
        onBlur={props.onChange}
      >
        <ModalHeader>
          {props.title}
          <ModalCloseButton
            type="button"
            aria-label={props.closeButtonAriaLabel}
            onClick={props.onChange}
          >
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        {props.show ? props.children : null}
      </ModalContainer>
    </ModalOverlay>
  ) : null;
}

Modal.propTypes = {
  show: bool.isRequired,
  title: string,
  children: node,
  onChange: func.isRequired,
  closeButtonAriaLabel: string.isRequired,
};
