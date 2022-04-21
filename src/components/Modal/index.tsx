import { bool, func, InferProps, node, string } from "prop-types";
import { SyntheticEvent, useEffect, useState } from "react";
import { isMobile } from "../../utils/isMobile";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
} from "./styles";
import CloseIcon from "../../icons/close.svg?component";

export default function Modal(props: InferProps<typeof Modal.propTypes>) {
  const [show, setShow] = useState(false);

  function onContainerClick(evt: SyntheticEvent) {
    if (!isMobile()) {
      evt.stopPropagation();
    }
  }

  useEffect(() => {
    if (!show && props.show) setShow(true);
  }, [props.show]);

  return show ? (
    <ModalOverlay show={props.show} onClick={props.onClick}>
      <ModalContainer onClick={onContainerClick}>
        <ModalHeader>
          {props.title}
          <ModalCloseButton type="button" onClick={props.onClick}>
            <CloseIcon />
          </ModalCloseButton>
        </ModalHeader>
        {props.children}
      </ModalContainer>
    </ModalOverlay>
  ) : null;
}

Modal.propTypes = {
  show: bool.isRequired,
  title: string,
  children: node,
  onClick: func.isRequired,
};
