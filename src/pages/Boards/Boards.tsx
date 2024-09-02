import "./Boards.scss";
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Toolbar from "./components/Toolbar/Toolbar";
import BoardFormModal from "./components/BoardFormModal";
import Modal, { ModalTitle } from "../../components/Modal/Modal";
import useBoard from "./hooks/useBoard";
import Button from "../../components/Button/Button";
// import { useParams } from "react-router-dom";

function Boards() {
  // const { boardId, taskId } = useParams();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const addTask = useCallback(() => {}, []);

  const onSidebarToggleChange = useCallback((evt) => {
    setShowSidebar(evt.target.checked);
  }, []);

  const onError = useCallback(() => {
    setShowErrorModal(true);
  }, []);

  const onErrorModalClose = useCallback(() => {
    setShowErrorModal(false);
  }, []);

  const {
    boards,
    selectedBoard,
    boardForEdit,
    showBoardModal,
    showDeleteModal,
    selectBoard,
    onCreateBoard,
    onEditBoard,
    onDeleteBoard,
    deleteBoard,
    onCloseBoardModal,
    onCloseDeleteModal,
    onBoardFormSubmit,
  } = useBoard(onError);

  useEffect(() => {
    setShowSidebar(boards.length > 0);
  }, [boards]);

  return (
    <div className="container">
      <input
        type="checkbox"
        id="sidebar-toggle"
        checked={showSidebar}
        onChange={onSidebarToggleChange}
      />

      <Sidebar
        boards={boards}
        selectedBoard={selectedBoard}
        onSelectBoard={selectBoard}
        onCreateBoard={onCreateBoard}
      />

      <Toolbar
        selectedBoard={selectedBoard}
        onAddTask={addTask}
        onEditBoard={onEditBoard}
        onDeleteBoard={onDeleteBoard}
      />

      <Main
        boards={boards}
        selectedBoard={selectedBoard}
        onCreateBoard={onCreateBoard}
      />

      <BoardFormModal
        show={showBoardModal}
        board={boardForEdit}
        onClose={onCloseBoardModal}
        onSubmit={onBoardFormSubmit}
      />

      <Modal show={showDeleteModal} onClose={onCloseDeleteModal}>
        <ModalTitle className="danger--text">Board Delete</ModalTitle>
        <p>
          You are sure you want to delete the board:{" "}
          <strong>{selectedBoard?.title}</strong> ?
        </p>
        <Button danger block onClick={deleteBoard}>
          Yes, delete
        </Button>
        <Button secondary block onClick={onCloseDeleteModal}>
          No, cancel
        </Button>
      </Modal>

      <Modal show={showErrorModal} onClose={onErrorModalClose}>
        <ModalTitle className="danger--text">Error</ModalTitle>
        <p>An error has occurred, please try again later.</p>
      </Modal>
    </div>
  );
}

export default Boards;
