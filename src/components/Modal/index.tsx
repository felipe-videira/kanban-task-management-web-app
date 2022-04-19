import { bool, func, InferProps, node, string } from "prop-types";
import { SyntheticEvent } from "react";
import { isMobile } from "../../utils/isMobile";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalCloseButton,
} from "./styles";

export default function Modal(props: InferProps<typeof Modal.propTypes>) {
  function onContainerClick(evt: SyntheticEvent) {
    if (!isMobile()) {
      evt.stopPropagation();
    }
  }

  return (
    <ModalOverlay show={props.show} onClick={props.onClick}>
      <ModalContainer onClick={onContainerClick}>
        <ModalHeader>
          {props.title}
          <ModalCloseButton type="button" onClick={props.onClick}>
            &times;
          </ModalCloseButton>
        </ModalHeader>
        {props.children}
      </ModalContainer>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  show: bool.isRequired,
  title: string,
  children: node,
  onClick: func.isRequired,
};
