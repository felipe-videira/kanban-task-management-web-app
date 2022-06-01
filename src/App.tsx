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

  function openModal({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    setModalTitle(title);
    setModalChildren(children);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setModalTitle("");
    setModalChildren(null);
  }

  return (
    <AppContainer>
      <ModalProvider value={{ open: openModal, close: closeModal }}>
        <Routes />
      </ModalProvider>

      <Attribution
        role="navigation"
        dangerouslySetInnerHTML={{ __html: t("message.attribution") }}
      />

      <Modal
        show={showModal}
        onClose={closeModal}
        title={modalTitle}
        closeButtonAriaLabel={t("ariaLabel.close")}
      >
        {modalChildren}
      </Modal>
    </AppContainer>
  );
}

export default App;
