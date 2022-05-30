import Routes from "./Routes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./components/Modal";
import { ModalProvider } from "./hooks/useModal";
import { AppContainer, Attribution } from "./App.styles";

function App() {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalChildren, setModalChildren] = useState<React.ReactNode>(null);

  function toggleModal({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    const newValue = !showModal;

    if (newValue) {
      setModalTitle(title);
      setModalChildren(children);
    } else {
      setModalTitle("");
      setModalChildren(null);
    }

    setShowModal(newValue);

    return newValue;
  }

  return (
    <AppContainer>
      <ModalProvider value={{ toggle: toggleModal }}>
        <Routes />
      </ModalProvider>

      <Attribution
        tabIndex={0}
        role="navigation"
        dangerouslySetInnerHTML={{ __html: t("message.attribution") }}
      />

      <Modal
        show={showModal}
        onChange={toggleModal}
        title={modalTitle}
        closeButtonAriaLabel={t("ariaLabel.close")}
      >
        {modalChildren}
      </Modal>
    </AppContainer>
  );
}

export default App;
